from django.core.management.base import BaseCommand
from todo.seed import run_seed  # Adjust the import based on your seeding function location

class Command(BaseCommand):
    help = 'Seed database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        run_seed()
        self.stdout.write('Done.')
