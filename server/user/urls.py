from django.urls import re_path, include

urlpatterns = [
    re_path('', include('rest_auth.urls')),
    re_path('registration/', include('rest_auth.registration.urls'))
]
