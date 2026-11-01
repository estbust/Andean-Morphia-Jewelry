from decimal import Decimal
from django.core.management.base import BaseCommand
from catalog.models import Category, Product, ProductImage


class Command(BaseCommand):
    help = 'Seeds initial jewelry categories, the 6 authentic rings, and product images from ROADMAP.md'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initializing Andean Morphia catalog seeding..."))

        # 1. Create or update primary category: Anillos
        category, cat_created = Category.objects.update_or_create(
            slug='anillos',
            defaults={
                'name': 'Anillos',
                'description': 'Anillos artesanales en Plata 950 y Oro elaborados en Cusco.',
            }
        )
        if cat_created:
            self.stdout.write(self.style.SUCCESS(f"Created category: {category.name} ({category.slug})"))
        else:
            self.stdout.write(f"Updated category: {category.name} ({category.slug})")

        # 2. Exact 6 rings data from Section 3.2 of ROADMAP.md
        products_data = [
            {
                "slug": "anillo-en-punta",
                "name": "Anillo en punta",
                "metal_type": "PLATA",
                "price": Decimal("90.00"),
                "short_description": "Anillo con forma semi triangular en punta con detalles labrados de inspiración ancestral en Plata 950.",
                "symbolic_meaning": "Representa la dirección consciente, el ascenso hacia las cumbres andinas y la determinación en cada etapa de evolución personal.",
                "technical_details": "Plata 950 artesanal cusqueña. Acabado brillante con textura ancestral labrada.",
                "image_path": "/products/chevron-ring.png",
                "stock": 10,
                "is_featured": True,
                "is_active": True,
            },
            {
                "slug": "anillo-corona-corazon",
                "name": "Anillo corona corazón",
                "metal_type": "PLATA",
                "price": Decimal("138.00"),
                "short_description": "Anillo en Plata 950 en forma de corazón coronado con finos acabados artesanales.",
                "symbolic_meaning": "Símbolo de lealtad interior, amor propio y soberanía sobre nuestro propio camino de renacer y libertad emocional.",
                "technical_details": "Plata 950 con micro detalles labrados. Corona pulida y base reforzada.",
                "image_path": "/products/claddagh-ring.png",
                "stock": 8,
                "is_featured": True,
                "is_active": True,
            },
            {
                "slug": "anillo-dos-cabezas-de-serpiente",
                "name": "Anillo dos cabezas de serpiente",
                "metal_type": "PLATA",
                "price": Decimal("128.00"),
                "short_description": "Anillo abierto con dos cabezas de serpiente finamente detalladas en Plata 950.",
                "symbolic_meaning": "Inspirado en la sabiduría ancestral andina (Amaru), simboliza la dualidad, el cambio de piel y la transformación profunda del ser.",
                "technical_details": "Plata 950 ajustable. Escamas grabadas artesanalmente con ojos en bajo relieve.",
                "image_path": "/products/two-headed-snake-ring.png",
                "stock": 12,
                "is_featured": True,
                "is_active": True,
            },
            {
                "slug": "anillo-con-piedra-coral",
                "name": "Anillo con piedra coral",
                "metal_type": "PLATA",
                "price": Decimal("226.00"),
                "short_description": "Anillo en Plata 950 engastado con marquesitas y piedra ovalada central en tono coral.",
                "symbolic_meaning": "Conecta la energía vital de la naturaleza con la fortaleza interior; una pieza creada para recordar la belleza de volver a brillar.",
                "technical_details": "Plata 950, cabujón central coral engastado en bisel con halo de marquesitas naturales.",
                "image_path": "/products/coral-ring.png",
                "stock": 6,
                "is_featured": True,
                "is_active": True,
            },
            {
                "slug": "anillo-de-serpiente",
                "name": "Anillo de serpiente",
                "metal_type": "PLATA",
                "price": Decimal("190.00"),
                "short_description": "Anillo envolvente en forma de serpiente trabajada artesanalmente en Plata 950.",
                "symbolic_meaning": "Emblema de renovación continua, sanación y renacimiento, acompañando el proceso de soltar el pasado para evolucionar.",
                "technical_details": "Plata 950 maciza con tres vueltas envolventes y grabado de escamas de alta definición.",
                "image_path": "/products/snake-ring.png",
                "stock": 7,
                "is_featured": True,
                "is_active": True,
            },
            {
                "slug": "anillo-corona",
                "name": "Anillo corona",
                "metal_type": "PLATA",
                "price": Decimal("130.00"),
                "short_description": "Anillo en forma de corona clásica con incrustaciones de marquesitas en Plata 950.",
                "symbolic_meaning": "Celebra la autenticidad, el empoderamiento y el reconocimiento de la luz propia tras cada proceso de transformación.",
                "technical_details": "Plata 950 con incrustaciones de marquesitas en las puntas de la corona y borde pulido a espejo.",
                "image_path": "/products/crown-ring.png",
                "stock": 9,
                "is_featured": True,
                "is_active": True,
            },
        ]

        for item in products_data:
            slug = item.pop("slug")
            product, created = Product.objects.update_or_create(
                slug=slug,
                defaults={
                    "category": category,
                    **item,
                }
            )
            action = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"{action} product: {product.name} ({product.slug}) - S/ {product.price}"))

            # Primary image
            ProductImage.objects.update_or_create(
                product=product,
                image_path=product.image_path,
                defaults={
                    "alt_text": product.name,
                    "is_primary": True,
                }
            )

        self.stdout.write(self.style.SUCCESS("Catalog successfully seeded with 6 signature Andean Morphia pieces!"))
