from django.views.generic.list import ListView

from people.models import TechnicalExpert


class CreatorsListView(ListView):
    model = TechnicalExpert
    template_name = 'people/creators_list.html'
    context_object_name = 'technical_experts'
