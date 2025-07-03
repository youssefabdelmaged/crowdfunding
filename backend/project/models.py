from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    target_amount = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    current_fund = models.IntegerField(default=0)
    currency = models.CharField(max_length=3, default='EGP')

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return f"{self.title}"
