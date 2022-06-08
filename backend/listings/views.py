from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from datetime import datetime, timezone


class ListingsView(ListAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer
    lookup_field = 'slug'


class ListingView(RetrieveAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'


class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        queryset = Listing.objects.order_by('-list_date').filter(
            is_published=True)
        data = self.request.data

        # Sale Type

        sale_type = data['sale_type']
        queryset = queryset.filter(sale_type__iexact=sale_type)
        
        # City

        city = data['city']
        queryset = queryset.filter(city__iexact=city)

        # Home Type

        home_type = data['home_type']
        queryset = queryset.filter(home_type__iexact=home_type)

        # Price

        price = data['price']

        if price == '100,000+':
            price = 100000
        elif price == '200,000+':
            price = 200000
        elif price == '400,000+':
            price = 400000
        elif price == '600,000+':
            price = 600000
        elif price == '800,000+':
            price = 800000
        elif price == '1,000,000+':
            price = 1000000
        elif price == 'Any':
            price = -1

        if price != -1:
            queryset = queryset.filter(price__gte=price)


        serializer = ListingSerializer(queryset, many=True)

        return Response(serializer.data)
