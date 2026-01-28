import os
from credyjobboard.nlp_utils import init_sentry

SENTRY_DSN = os.environ.get('SENTRY_DSN')
if SENTRY_DSN:
    init_sentry(SENTRY_DSN)
