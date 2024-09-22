from bson import ObjectId
from fastapi import APIRouter, Request
from langchain_community.llms import Ollama
from fastapi.responses import JSONResponse
from sse_starlette.sse import EventSourceResponse
import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import jwt
from diffusers import StableDiffusionPipeline
import base64
from io import BytesIO
import torch
from diffusers import AnimateDiffPipeline, MotionAdapter, EulerDiscreteScheduler

llm = Ollama(model="llama3")
router = APIRouter()


# @router.post("/llama")
# async def llama(request: Request):
#     body = await request.json()

#     base_prompt = "You are a helpful and knowledgeable assistant who help everything about books. Answer the following prompt appropriately:\n\n"
#     prompt = f"{base_prompt}{body['prompt']}"
#     result = llm(prompt)

#     return JSONResponse(content={"title": result}, status_code=200)


def generate_image(prompt: str):
    model_id = "runwayml/stable-diffusion-v1-5"


    pipe = StableDiffusionPipeline.from_pretrained(
        model_id, torch_dtype=torch.float16)
    pipe = pipe.to("cuda")

    image = pipe(prompt, num_inference_steps=50, height=512, width=512).images[0]
    return image

def get_base64_image(image):
    buffered = BytesIO()
    image.save(buffered, format="png")
    image_bytes = buffered.getvalue()
    encoded_image = base64.b64encode(image_bytes).decode('utf-8')
    return encoded_image

@router.post("/image")
async def image(request: Request):
    body = await request.json()
    prompt = body['prompt']

    image = generate_image(prompt)
    encoded_image = get_base64_image(image)
    encoded_image = "data:image/png;base64," + encoded_image

    return JSONResponse(content={"image": encoded_image}, status_code=200)