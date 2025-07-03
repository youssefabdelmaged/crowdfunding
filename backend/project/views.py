from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ProjectModelSerializer
from .models import Project
from rest_framework.response import Response

# View for listing all projects and creating a new project
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

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# View for retrieving details of a single project by ID
class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    permission_classes = [IsAuthenticated]