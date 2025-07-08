from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, BasePermission

from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
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

    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         return [IsAuthenticated()]
    #     return [AllowAny()]


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# View for retrieving details of a single project by ID
#  def get_queryset(self):
#         start_date = self.request.query_params.get('start_date')
#         end_date = self.request.query_params.get('end_date')
#         if start_date and end_date:
#             queryset = Project.objects.filter(date__range=[start_date, end_date])
#             if not queryset.exists():
#                 project_id = self.request.query_params.get('id')
#                 if project_id:
#                     return Project.objects.filter(id=project_id)
#                 return Project.objects.none()
#             return queryset
#         return Project.objects.all()

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    permission_classes = [IsAuthenticated]









class ProjectSearchView(generics.ListAPIView):
    serializer_class = ProjectModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if start_date and end_date:
            queryset = Project.objects.filter(start_date__gte=start_date, end_date__lte=end_date)
            if not queryset.exists():
                project_id = self.request.query_params.get('id')
                if project_id:
                    return Project.objects.filter(id=project_id)
                return Project.objects.none()
            return queryset

        return Project.objects.all()





@api_view(["DELETE", "GET"])
def delete_project(request, id):
    try:
        project = Project.objects.get(pk=id)
    except Project.DoesNotExist:
        return Response(data={"msg": "project not found"}, status=status.HTTP_404_NOT_FOUND)

    if project.owner == request.user:
        project.delete()
        return Response(data={"msg": f"project with id: {id}  deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"error": "not allowed"}, status=status.HTTP_403_FORBIDDEN)

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
    
class ProjectUpdateView(generics.UpdateAPIView):
    serializer_class = ProjectModelSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)