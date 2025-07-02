
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import createUserView, UserListView, MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', createUserView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('api/users/', UserListView.as_view(), name='user-list'),
]
