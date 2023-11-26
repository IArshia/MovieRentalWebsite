from django.db import models
# Create your models here.

class Genre(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title

class Movie(models.Model):
    title = models.CharField(max_length=255)
    genre = models.ForeignKey(Genre, on_delete=models.PROTECT)
    number_in_stock = models.IntegerField()
    daily_rental_rate = models.DecimalField(decimal_places=1, max_digits=2)

    def __str__(self) -> str:
        return self.title


#     _id: "5b21ca3eeb7f6fbccd47181f",
#     title: "The Sixth Sense",
#     genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
#     numberInStock: 4,
#     dailyRentalRate: 3.5
#   },






