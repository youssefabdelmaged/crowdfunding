from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import CreateUserView, UserListView, MyTokenObtainPairView
from project.views import *
# from .views import ProjectListCreateView, ProjectDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('api/users/', UserListView.as_view(), name='user-list'),
    path('api/projects/', ProjectListCreateView.as_view(), name='create_project'),
    path('api/projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('api/delete/<int:id>/', delete_project, name='project-detail'),

]
