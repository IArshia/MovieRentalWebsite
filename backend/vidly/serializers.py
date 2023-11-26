
from rest_framework import serializers
from . import models

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genre
        fields = "__all__"        
        
class AddMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Movie
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    class Meta:
        model = models.Movie
        fields = "__all__"
