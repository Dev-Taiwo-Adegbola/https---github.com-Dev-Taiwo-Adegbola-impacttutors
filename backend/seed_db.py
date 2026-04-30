import os
import django
import uuid
from datetime import datetime, timedelta
from django.utils import timezone

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Profile, Course, StudentTutorAssignment, Session, UserRole, SessionStatus

def seed():
    print("Seeding database...")
    
    # 1. Create Admin
    admin_user, _ = User.objects.get_or_create(username='admin@impacttutors.com', email='admin@impacttutors.com')
    admin_user.set_password('admin123')
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
    
    admin_profile, _ = Profile.objects.get_or_create(
        user=admin_user,
        defaults={'role': UserRole.ADMIN, 'full_name': 'System Administrator', 'is_onboarded': True}
    )

    # 2. Create Tutors
    tutor1_user, _ = User.objects.get_or_create(username='tutor1@example.com', email='tutor1@example.com')
    tutor1_user.set_password('tutor123')
    tutor1_user.save()
    tutor1_profile, _ = Profile.objects.get_or_create(
        user=tutor1_user,
        defaults={
            'role': UserRole.TUTOR, 
            'full_name': 'John Doe', 
            'is_onboarded': True,
            'tutor_bio': 'Experienced Math and Physics tutor with 10 years of experience.'
        }
    )

    tutor2_user, _ = User.objects.get_or_create(username='tutor2@example.com', email='tutor2@example.com')
    tutor2_user.set_password('tutor123')
    tutor2_user.save()
    tutor2_profile, _ = Profile.objects.get_or_create(
        user=tutor2_user,
        defaults={
            'role': UserRole.TUTOR, 
            'full_name': 'Sarah Smith', 
            'is_onboarded': False, # Pending activation
            'tutor_bio': 'Biology specialist.'
        }
    )

    # 3. Create Students
    student1_user, _ = User.objects.get_or_create(username='student1@example.com', email='student1@example.com')
    student1_user.set_password('student123')
    student1_user.save()
    student1_profile, _ = Profile.objects.get_or_create(
        user=student1_user,
        defaults={
            'role': UserRole.STUDENT, 
            'full_name': 'Michael Jordan', 
            'is_onboarded': True,
            'grade_level': 'GCSE',
            'curriculum': 'British'
        }
    )

    student2_user, _ = User.objects.get_or_create(username='student2@example.com', email='student2@example.com')
    student2_user.set_password('student123')
    student2_user.save()
    student2_profile, _ = Profile.objects.get_or_create(
        user=student2_user,
        defaults={
            'role': UserRole.STUDENT, 
            'full_name': 'Jane Doe', 
            'is_onboarded': False, # New/Pending
            'grade_level': 'Year 9',
            'curriculum': 'Nigerian'
        }
    )

    # 4. Create Courses
    math_course, _ = Course.objects.update_or_create(
        slug='gcse-mathematics',
        defaults={
            'title': 'GCSE Mathematics',
            'category': 'Mathematics',
            'description': 'Comprehensive GCSE Math preparation.',
            'is_published': True,
            'student': student1_profile,
            'tutor': tutor1_profile,
            'meet_link': 'https://meet.google.com/abc-defg-hij',
        }
    )

    physics_course, _ = Course.objects.update_or_create(
        slug='physics-advanced',
        defaults={
            'title': 'Advanced Physics',
            'category': 'Science',
            'description': 'Advanced Physics concepts for high school students.',
            'is_published': True,
            'student': student1_profile,
            'tutor': tutor1_profile,
            'meet_link': 'https://meet.google.com/xyz-pdqr-lmn',
        }
    )

    # 5. Create Assignments
    StudentTutorAssignment.objects.update_or_create(
        student=student1_profile,
        tutor=tutor1_profile,
        defaults={'is_active': True}
    )

    # 6. Create Sessions
    now = timezone.now()
    
    # Upcoming Session
    Session.objects.update_or_create(
        student=student1_profile,
        tutor=tutor1_profile,
        course=math_course,
        start_time=now + timedelta(days=1, hours=2),
        defaults={
            'duration_minutes': 60,
            'meet_link': 'https://meet.google.com/abc-defg-hij',
            'status': SessionStatus.SCHEDULED
        }
    )

    # Past/Completed Session
    Session.objects.update_or_create(
        student=student1_profile,
        tutor=tutor1_profile,
        course=math_course,
        start_time=now - timedelta(days=2),
        defaults={
            'duration_minutes': 60,
            'meet_link': 'https://meet.google.com/xyz-pdqr-lmn',
            'status': SessionStatus.COMPLETED
        }
    )

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed()
