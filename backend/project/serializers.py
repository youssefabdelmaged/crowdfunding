from rest_framework import serializers
from .models import Project
from datetime import date

class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner']

    def validate(self, attrs):
        start = attrs.get('start_date')
        end = attrs.get('end_date')
        target = attrs.get('target_amount')
        currency = attrs.get('currency')

        if start and start < date.today():
            raise serializers.ValidationError({
                "start_date": "Start date must be today or a future date."
            })

        if start and end and start >= end:
            raise serializers.ValidationError({
                "end_date": "End date must be after start date."
            })

        if target is not None and target <= 0:
            raise serializers.ValidationError({
                "target_amount": "Target amount must be a positive number."
            })

        allowed_currencies = ['EGP', 'USD', 'EUR']
        if currency and currency.upper() not in allowed_currencies:
            raise serializers.ValidationError({
                "currency": f"Unsupported currency '{currency}'. Allowed: {', '.join(allowed_currencies)}."
            })

        return attrs
