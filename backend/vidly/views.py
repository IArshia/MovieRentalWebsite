from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from . import models, serializers

class MovieViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.request.method in ["POST", "PUT"]:
            return serializers.AddMovieSerializer
        else:
            return serializers.MovieSerializer
    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsAuthenticated()]
        else:
            return [] 
    queryset = models.Movie.objects.all()


class GenreViewSet(ModelViewSet):
    serializer_class = serializers.GenreSerializer
    queryset = models.Genre.objects.all()    
