from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ProjectModelSerializer
from .models import Project

class ProjectListCreateView(generics.ListCreateAPIView):

    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [permission() for permission in self.permission_classes]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
