import google.generativeai as genai
import os
import json
import vertexai
from vertexai.generative_models import (
    GenerationConfig,
    GenerativeModel,
    Tool,
    grounding,
)

def food_expiration(image_file):
    genai.configure(api_key=os.environ["API_KEY"])

    myfile = genai.upload_file("C:\\Users\\noahm\\OneDrive\\Desktop\\Calhacks\\GroceryTrackerRepo\\grocery-tracker\\GroceryTracker\\backend\\images\\" + image_file)

    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content(
        [myfile, "\n\n", "Identify the food items from the text of this grocery receipt. If adjectives come after the food items, write the food items with the adjectives in front. If there are abbreviations to food items, write the full name of the food item. Return a list of the food items."]
    )
    # print(result.text)

    # response1 = model.generate_content([result.text, "\n\n", "Can you make a list of the estimated shelf life for each food item along with the best method of storing these items? Make sure the shelf life value is a single integer representing the number of days and that the storing method is either Refrigerator, Countertop, or Freezer?"])
    # print(response1.text)

    PROJECT_ID = "winter-inquiry-439119-v8"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    tool = Tool.from_google_search_retrieval(grounding.GoogleSearchRetrieval())

    model = GenerativeModel("gemini-1.5-flash-001")

    prompt1 = ("Make a list of the estimated shelf life for each food item, making sure that the shelf life " + 
               "is a single number representing the average number of days, for the following food items. Return " + 
               "it in a python dictionary format with each food item mapping to an integer representing the estimated shelf life" + result.text)
    response1 = model.generate_content(
        prompt1,
        tools=[tool],
        generation_config=GenerationConfig(
            temperature=0.0,
        ),
    )
    # print(response1.text)
    return response1.text


def generate_recipe(s):
    PROJECT_ID = "winter-inquiry-439119-v8"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    tool = Tool.from_google_search_retrieval(grounding.GoogleSearchRetrieval())

    model = GenerativeModel("gemini-1.5-flash-001")
    prompt2 = "Give 1 recipe including some but not necessarily all ingredients given in this list. Return it in a python dictionary format with 'title' mapping to the name of the recipe and 'description' mapping to the ingredients and directions of the recipe." + s
    response2 = model.generate_content(
        prompt2,
        tools=[tool],
        generation_config=GenerationConfig(
            temperature=0.0,
        ),
    )
    # print(response2.text)
    return response2.text


# def main():
#     x = food_expiration("receipt.jpeg")
#     s = generate_recipe(x)
#     # data = {
#     #     "message": s,
#     #     "status": "success"
#     # }
#     return x, s

# if __name__ == "__main__":
#     print(main())



# from PIL import Image
# import pytesseract

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

# print(pytesseract.image_to_boxes(Image.open('images/receipt.jpeg')))
# # Get verbose data including boxes, confidences, line and page numbers
# print(pytesseract.image_to_data(Image.open('images/receipt.jpeg')))
# # Get information about orientation and script detection
# print(pytesseract.image_to_osd(Image.open('images/receipt.jpeg')))

# s = pytesseract.image_to_string(Image.open('images/receipt.jpeg'))

# service_account_file_name = 'service_account_key.json'

# from google.oauth2 import service_account

# credentials = service_account.Credentials.from_service_account_file(service_account_file_name)

# scoped_credentials = credentials.with_scopes(
#     ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/generative-language.retriever'])

# import google.ai.generativelanguage as glm
# generative_service_client = glm.GenerativeServiceClient(credentials=scoped_credentials)
# retriever_service_client = glm.RetrieverServiceClient(credentials=scoped_credentials)
# permission_service_client = glm.PermissionServiceClient(credentials=scoped_credentials)

# example_corpus = glm.Corpus(display_name="Recipe Generator")
# create_corpus_request = glm.CreateCorpusRequest(corpus=example_corpus)

# # Make the request
# create_corpus_response = retriever_service_client.create_corpus(create_corpus_request)

# # Set the `corpus_resource_name` for subsequent sections.
# corpus_resource_name = create_corpus_response.name

# get_corpus_request = glm.GetCorpusRequest(name=corpus_resource_name)

# # Make the request
# get_corpus_response = retriever_service_client.get_corpus(get_corpus_request)

# # Create a document with a custom display name.
# example_document = glm.Document(display_name="TasteOfHomeRecipes")

# # Add metadata.
# # Metadata also supports numeric values not specified here
# document_metadata = [
#     glm.CustomMetadata(key="url", string_value="https://www.tasteofhome.com/collection/our-100-highest-rated-recipes-ever")]
# example_document.custom_metadata.extend(document_metadata)

# # Make the request
# # corpus_resource_name is a variable set in the "Create a corpus" section.
# create_document_request = glm.CreateDocumentRequest(parent=corpus_resource_name, document=example_document)
# create_document_response = retriever_service_client.create_document(create_document_request)

# # Set the `document_resource_name` for subsequent sections.
# document_resource_name = create_document_response.name

# get_document_request = glm.GetDocumentRequest(name=document_resource_name)

# # Make the request
# # document_resource_name is a variable set in the "Create a document" section.
# get_document_response = retriever_service_client.get_document(get_document_request)

# # Print the response
# print(get_document_response)

# user_query = "Give 3 recipes from this list with main ingredients from this list:" + response1.text
# answer_style = "EXTRACTIVE" # Or VERBOSE, EXTRACTIVE
# MODEL_NAME = "models/aqa"

# # Make the request
# # corpus_resource_name is a variable set in the "Create a corpus" section.
# content = glm.Content(parts=[glm.Part(text=user_query)])
# retriever_config = glm.SemanticRetrieverConfig(source=corpus_resource_name, query=content)
# req = glm.GenerateAnswerRequest(model=MODEL_NAME,
#                                 contents=[content],
#                                 semantic_retriever=retriever_config,
#                                 answer_style=answer_style)
# aqa_response = generative_service_client.generate_answer(req)
# print(aqa_response)

# # Get the metadata from the first attributed passages for the source
# chunk_resource_name = aqa_response.answer.grounding_attributions[0].source_id.semantic_retriever_chunk.chunk
# get_chunk_response = retriever_service_client.get_chunk(name=chunk_resource_name)
# print(get_chunk_response)

# import vertexai

# from vertexai.generative_models import (
#     GenerationConfig,
#     GenerativeModel,
#     Tool,
#     grounding,
# )

# # TODO(developer): Update and un-comment below line
# PROJECT_ID = "winter-inquiry-439119-v8"
# vertexai.init(project=PROJECT_ID, location="us-central1")

# model = GenerativeModel("gemini-1.5-flash-001")

# # Use Google Search for grounding
# tool = Tool.from_google_search_retrieval(grounding.GoogleSearchRetrieval())

# prompt = "Give 3 recipes from this list with main ingredients from this list:" + response1.text
# response2 = model.generate_content(
#     prompt,
#     tools=[tool],
#     generation_config=GenerationConfig(
#         temperature=0.0,
#     ),
# )

# print(response2.text)

