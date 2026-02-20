import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Анализирует фото кожи через Google Gemini Vision и возвращает детальный отчёт."""

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

    api_key = os.environ['GEMINI_API_KEY']

    prompt = """Ты эксперт-дерматолог по подростковой коже. Проанализируй это селфи и дай структурированный отчёт.

Верни ТОЛЬКО валидный JSON без markdown и без блоков ```json в следующем формате:
{
  "oiliness": {
    "level": "низкий" | "средний" | "высокий",
    "score": число от 1 до 10,
    "comment": "короткое описание 1-2 предложения"
  },
  "inflammation": {
    "level": "нет" | "слабое" | "умеренное" | "сильное",
    "score": число от 1 до 10,
    "comment": "короткое описание 1-2 предложения"
  },
  "pores": {
    "level": "незаметные" | "умеренные" | "расширенные",
    "score": число от 1 до 10,
    "comment": "короткое описание 1-2 предложения"
  },
  "texture": {
    "level": "гладкая" | "неровная" | "шероховатая",
    "score": число от 1 до 10,
    "comment": "короткое описание 1-2 предложения"
  },
  "pigmentation": {
    "level": "нет" | "слабая" | "выраженная",
    "score": число от 1 до 10,
    "comment": "короткое описание 1-2 предложения"
  },
  "overall_skin_type": "жирная" | "сухая" | "комбинированная" | "нормальная" | "чувствительная",
  "summary": "общий вывод 2-3 предложения, дружелюбный тон для подростка",
  "top_tips": ["совет 1", "совет 2", "совет 3"]
}"""

    payload = json.dumps({
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_base64
                        }
                    }
                ]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": 1000,
            "temperature": 0.3
        }
    }).encode('utf-8')

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    req = urllib.request.Request(
        url,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))

    content = result['candidates'][0]['content']['parts'][0]['text']

    # Убираем возможные markdown-блоки
    content = content.strip()
    if content.startswith('```'):
        content = content.split('\n', 1)[1]
    if content.endswith('```'):
        content = content.rsplit('```', 1)[0]
    content = content.strip()

    analysis = json.loads(content)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(analysis)
    }