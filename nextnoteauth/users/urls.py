# from django.urls import re_path, include
# from . import views


# urlpatterns = [
#     re_path('', include('rest_auth.urls')),
#     # re_path('registration/', include('rest_auth.registration.urls')),
#     # re_path('hello', views.HelloNotes.as_view(), name="hello"),
#     re_path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
# ]
# from rest_framework.authtoken.views import obtain_auth_token

from rest_framework import routers
from .views import AuthViewSet
# from django.urls import path
# from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('', AuthViewSet, basename='auth')


urlpatterns = router.urls
