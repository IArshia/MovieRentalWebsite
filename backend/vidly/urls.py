from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('movies', views.MovieViewSet, basename='movies')
router.register('genres', views.GenreViewSet, basename='genres')

urlpatterns = router.urls
