from rest_framework import viewsets
from .footer import Footer
from .footer_serializer import FooterSerializer

class FooterViewSet(viewsets.ModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer
    http_method_names = ['get', 'put', 'patch']

    def get_object(self):
        # Always return the first Footer instance (singleton)
        obj, _ = Footer.objects.get_or_create(id=1)
        return obj
