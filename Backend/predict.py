import sys
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

def load_model_and_predict(input_text):
    # Load the model from the .pkl file
    Embeddings = joblib.load('model.pkl')

    # Load the SentenceTransformer model
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Encode the input text
    input_encoding = model.encode(input_text, normalize_embeddings=False)

    # Calculate similarity scores
    Embeddings["Similarity_Score"] = (Embeddings["ada_embedding"].apply(lambda x: cosine_similarity([x], [input_encoding])[0][0]) * 3) + \
                                     ((Embeddings["specialisation_embedding"].apply(lambda x: cosine_similarity([x], [input_encoding])[0][0])) * 4) + \
                                     ((Embeddings["primary_embedding"].apply(lambda x: cosine_similarity([x], [input_encoding])[0][0])) * 3) 
                                     

    # Sort and return results
    result = Embeddings.sort_values(by='Similarity_Score', ascending=False)["idNumber"].tolist()
    return result

if __name__ == "__main__":
    input_text = sys.argv[1]
    id_numbers = load_model_and_predict(input_text)
    for id_number in id_numbers:
        print(id_number)
