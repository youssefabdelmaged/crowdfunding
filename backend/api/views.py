from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.views import APIView
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    """
    View to create a new user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Get api to list all users


class UserListView(generics.ListAPIView):
    """
    View to list all users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user_obj = User.objects.filter(email=email).first()
        if user_obj is None:
            raise serializers.ValidationError(
                {"detail": "User with this email does not exist."})

        user = authenticate(
            request=self.context.get('request'),
            username=user_obj.username,
            password=password
        )
        if user is None:
            raise serializers.ValidationError(
                {"detail": "Incorrect password."})

        token_data = TokenObtainPairSerializer().validate({
            'username': user.username,
            'password': password
        })

        return token_data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except serializers.ValidationError as exc:
            return Response({"error": exc.detail}, status=status.HTTP_400_BAD_REQUEST)
