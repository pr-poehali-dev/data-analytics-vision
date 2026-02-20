import json
import os
import base64
import urllib.request


def handler(event: dict, context) -> dict:
    """Анализирует фото кожи через GPT-4 Vision и возвращает детальный отчёт."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    raw_body = event.get('body') or '{}'
    body = json.loads(raw_body)
    image_base64 = body.get('image')

    if not image_base64:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Фото не передано'})
        }

    api_key = os.environ['OPENAI_API_KEY']

    prompt = """Ты эксперт-дерматолог по подростковой коже. Проанализируй это селфи и дай структурированный отчёт.

Верни ТОЛЬКО валидный JSON без markdown в следующем формате:
{
  "oiliness": {
    "level": "низкий" | "средний" | "высокий",
    "score": 1-10,
    "comment": "короткое описание 1-2 предложения"
  },
  "inflammation": {
    "level": "нет" | "слабое" | "умеренное" | "сильное",
    "score": 1-10,
    "comment": "короткое описание 1-2 предложения"
  },
  "pores": {
    "level": "незаметные" | "умеренные" | "расширенные",
    "score": 1-10,
    "comment": "короткое описание 1-2 предложения"
  },
  "texture": {
    "level": "гладкая" | "неровная" | "шероховатая",
    "score": 1-10,
    "comment": "короткое описание 1-2 предложения"
  },
  "pigmentation": {
    "level": "нет" | "слабая" | "выраженная",
    "score": 1-10,
    "comment": "короткое описание 1-2 предложения"
  },
  "overall_skin_type": "жирная" | "сухая" | "комбинированная" | "нормальная" | "чувствительная",
  "summary": "общий вывод 2-3 предложения, дружелюбный тон для подростка",
  "top_tips": ["совет 1", "совет 2", "совет 3"]
}"""

    payload = json.dumps({
        "model": "gpt-4o",
        "max_tokens": 1000,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}",
                            "detail": "high"
                        }
                    }
                ]
            }
        ]
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    content = result['choices'][0]['message']['content']
    analysis = json.loads(content)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(analysis)
    }