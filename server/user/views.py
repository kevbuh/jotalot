from rest_framework.views import APIView
from rest_framework.response import Response


class UserView(APIView):
    def post(self, request, format=None):
        print("Creating a user")
        return Response("Creating a user", status=200)
