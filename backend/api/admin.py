from django.contrib import admin
from .models import Profile, Course, StudentTutorAssignment, Session, InviteCode, StudentApplication, TutorApplication

@admin.register(InviteCode)
class InviteCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'role', 'is_used', 'created_at')
    list_filter = ('role', 'is_used')
    search_fields = ('code', 'target_email')

@admin.register(StudentApplication)
class StudentApplicationAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'phone', 'grade_level', 'status', 'created_at')
    list_filter = ('status', 'grade_level')
    search_fields = ('student_name', 'parent_name', 'email')

@admin.register(TutorApplication)
class TutorApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('full_name', 'email')
