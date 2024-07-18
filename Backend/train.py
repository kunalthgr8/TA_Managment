import pandas as pd
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


def train_model_and_save():
    df = pd.read_csv('tadata.csv')
    df["combined"] = df.apply(lambda row: ' '.join([str(row[col]) for col in df.columns if col not in ['idNumber','areaOfSpecialization','primarySkills','patents','publications']]), axis=1)

    model = SentenceTransformer("all-MiniLM-L6-v2")

    def get_embedding(text):
        text = str(text).replace("\n", " ")
        return model.encode(text, normalize_embeddings=False)

    df['primary_embedding'] = df.primarySkills.apply(lambda x: get_embedding(x))
    df['ada_embedding'] = df.combined.apply(lambda x: get_embedding(x))
    df['specialisation_embedding'] = df.areaOfSpecialization.apply(lambda x: get_embedding(x))
    # df['Experience_Industry'] = df.Experience_Industry.apply(lambda x: get_embedding(x))

    Embeddings = df[["idNumber", "ada_embedding", "specialisation_embedding", "primary_embedding"]]

    # Save the model as a .pkl file
    joblib.dump(Embeddings, 'model.pkl')

train_model_and_save()

