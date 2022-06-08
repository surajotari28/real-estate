from django.db import models
from realtors.models import Realtor
from django.utils.timezone import now



class Listing(models.Model):
    class SaleTypes(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'

    class HomeTypes(models.TextChoices):
        Flat = 'Flat'
        Bungalow = 'Bungalow'
        Residential_Land = 'Residential Land'
        Commercial_Land = 'Commercial Land'
        Shop = 'Shop'
        
    class City(models.TextChoices):
        Pune = 'Pune'
        Mumbai = 'Mumbai'
        Delhi = 'Delhi'
        Banglore = 'Banglore'
        Bhopal = 'Bhopal'
        Kolhapur = 'Kolhapur'
        

    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    state = models.CharField(max_length=100)
    # zipcode = models.CharField(max_length=20)
    # country = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50,
                                 choices=SaleTypes.choices,
                                 default=SaleTypes.FOR_SALE)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50,
                                 choices=HomeTypes.choices,
                                 default=HomeTypes.Flat)
    city = models.CharField(max_length=50,
                                 choices=City.choices,
                                 default=City.Pune)
    sqft = models.IntegerField()
    # open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title
