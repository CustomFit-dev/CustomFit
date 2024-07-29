from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, UserProfileViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'userprofiles', UserProfileViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', include(router.urls)),
]
