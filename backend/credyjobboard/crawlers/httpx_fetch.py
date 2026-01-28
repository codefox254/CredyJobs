import asyncio
import httpx

async def fetch_jobs():
    url = "https://openedcareer.com/category/jobs/"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        # Example: just print the first 500 chars
        print(response.text[:500])

if __name__ == "__main__":
    asyncio.run(fetch_jobs())
