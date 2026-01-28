from typing import List, Dict, Any

def extract_entities(text: str) -> Dict[str, Any]:
    """
    Extract named entities (ORG, GPE, PERSON, etc.) from job text.
    Returns a dict with lists of entities by type.
    """
    import spacy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        entities.setdefault(ent.label_, set()).add(ent.text)
    # Convert sets to lists for JSON serializability
    return {k: list(v) for k, v in entities.items()}

def extract_top_nouns(text: str, top_n: int = 5) -> List[str]:
    """
    Extract the most common nouns from the job description.
    """
    import spacy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    from collections import Counter
    nouns = [token.lemma_.lower() for token in doc if token.pos_ == "NOUN" and not token.is_stop]
    most_common = [w for w, _ in Counter(nouns).most_common(top_n)]
    return most_common

def extract_locations(text: str) -> List[str]:
    """
    Extract locations (GPE, LOC) from the job text.
    """
    import spacy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    return list({ent.text for ent in doc.ents if ent.label_ in ("GPE", "LOC")})

def extract_organizations(text: str) -> List[str]:
    """
    Extract organization names from the job text.
    """
    import spacy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    return list({ent.text for ent in doc.ents if ent.label_ == "ORG"})

def extract_dates(text: str) -> List[str]:
    """
    Extract date expressions from the job text.
    """
    doc = _nlp(text)
    return list({ent.text for ent in doc.ents if ent.label_ == "DATE"})

def extract_emails(text: str) -> List[str]:
    """
    Extract email addresses from the job text.
    """
    import re
    return re.findall(r"[\w\.-]+@[\w\.-]+", text)
def extract_skills(text: str, skill_keywords: List[str] = None) -> List[str]:
    """
    Extract skills from job text using keyword matching (simple baseline).
    Optionally pass a list of skill keywords to match.
    """
    if skill_keywords is None:
        # Example baseline skill list; extend as needed
        skill_keywords = [
            "python", "django", "react", "javascript", "sql", "aws", "docker", "linux",
            "git", "rest", "api", "html", "css", "kubernetes", "tensorflow", "pandas"
        ]
    text_lower = text.lower()
    found = [kw for kw in skill_keywords if kw in text_lower]
    return found

def summarize_job(text: str, max_sentences: int = 2) -> str:
    """
    Return a short summary of the job description (first N sentences).
    """
    doc = _nlp(text)
    sentences = list(doc.sents)
    summary = " ".join([sent.text.strip() for sent in sentences[:max_sentences]])
    return summary

# --- Advanced NLP: Semantic similarity (sentence-transformers) ---
from sentence_transformers import SentenceTransformer, util as st_util
_st_model = SentenceTransformer('all-MiniLM-L6-v2')

def semantic_similarity(text1: str, text2: str) -> float:
    """
    Compute semantic similarity between two texts using sentence-transformers.
    Returns a float between 0 and 1.
    """
    emb1 = _st_model.encode(text1, convert_to_tensor=True)
    emb2 = _st_model.encode(text2, convert_to_tensor=True)
    return float(st_util.pytorch_cos_sim(emb1, emb2).item())

# --- Language detection ---
from langdetect import detect, DetectorFactory
DetectorFactory.seed = 0

def detect_language(text: str) -> str:
    """
    Detect the language of the given text.
    Returns ISO 639-1 language code (e.g., 'en', 'fr').
    """
    try:
        return detect(text)
    except Exception:
        return "unknown"

# --- Date parsing ---
import dateparser

def parse_dates(text: str) -> list:
    """
    Parse all date expressions in text using dateparser.
    Returns a list of datetime objects (or None if not found).
    """
    doc = _nlp(text)
    results = []
    for ent in doc.ents:
        if ent.label_ == "DATE":
            dt = dateparser.parse(ent.text)
            if dt:
                results.append(dt)
    return results

# --- Sentry error monitoring setup ---
import sentry_sdk

def init_sentry(dsn: str, traces_sample_rate: float = 1.0):
    """
    Initialize Sentry error monitoring for the backend.
    Call this early in your Django or crawler startup.
    """
    sentry_sdk.init(
        dsn=dsn,
        traces_sample_rate=traces_sample_rate
    )

# Example usage:
# entities = extract_entities(job_description)
# skills = extract_skills(job_description)
# summary = summarize_job(job_description)
