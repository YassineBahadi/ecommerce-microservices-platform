<div align="center">

# 🛒 E-Commerce Microservices Platform

### Une architecture microservices event-driven, sécurisée et observable — construite avec Spring Boot & Spring Cloud

[![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-2023.x-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-cloud)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kafka](https://img.shields.io/badge/Apache%20Kafka-Event%20Driven-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)](https://kafka.apache.org/)
[![Keycloak](https://img.shields.io/badge/Keycloak-OAuth2%2FJWT-4D4D4D?style=for-the-badge&logo=keycloak&logoColor=white)](https://www.keycloak.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**[Architecture](#-architecture)** · **[Flux de données](#-flux-de-données)** · **[Stack technique](#️-stack-technique)** · **[Frontend](#-frontend-nextjs)** · **[Installation](#-installation--lancement)** · **[Authentification](#-authentification)** · **[API](#-endpoints-disponibles)**

</div>

---

## 📖 À propos du projet

**E-Commerce Microservices Platform** est une application full-stack qui modélise un système e-commerce complet — gestion des clients, du catalogue produit, des commandes, des paiements et des notifications — en appliquant les patterns d'architecture microservices utilisés en production : **service discovery**, **configuration centralisée**, **API Gateway**, **communication hybride sync/async**, **sécurité OAuth2/JWT** et **distributed tracing**, le tout consommé par un **frontend Next.js 14** typé et orienté performance.

Le projet a été conçu comme un terrain d'expérimentation réaliste pour maîtriser les défis concrets des systèmes distribués : cohérence des données entre services, découplage via event-driven design, résilience, et observabilité.

> 💡 **Pourquoi ce projet ?** Chaque service a une base de données dédiée (*database-per-service*), communique via Feign/Kafka selon le besoin métier, et est protégé de bout en bout par Keycloak — reproduisant les contraintes réelles d'un environnement microservices en entreprise.

---

## 🏗️ Architecture

<div align="center">
  <img src="architecture-diagram.png" alt="Architecture microservices e-commerce" width="850"/>
  <p><em>Vue d'ensemble du système — réseau public/privé, routage via l'API Gateway, communication synchrone (rouge/bleu) et asynchrone via Kafka (vert)</em></p>
</div>

### Composants du système

| Microservice | Port | Base de données | Rôle |
| :--- | :---: | :--- | :--- |
| 🧭 **Config Server** | `8888` | – | Centralisation et distribution de la configuration |
| 🔎 **Discovery Server (Eureka)** | `8761` | – | Annuaire de services et découverte dynamique |
| 🚪 **API Gateway** | `8222` | – | Point d'entrée unique, routage, load balancing |
| 👤 **Customer Service** | `8090` | MongoDB | Gestion des clients |
| 📦 **Product Service** | `8050` | PostgreSQL (Flyway) | Gestion du catalogue produits |
| 🧾 **Order Service** | `8070` | PostgreSQL | Orchestration des commandes |
| 💳 **Payment Service** | `8060` | PostgreSQL | Traitement des paiements |
| 📧 **Notification Service** | `8040` | MongoDB | Envoi d'emails (consumer Kafka) |
| 🔐 **Keycloak** | `9098` | – | Authentification / Autorisation (OAuth2 / JWT) |
| 🕵️ **Zipkin** | `9411` | – | Distributed tracing |
| 📨 **Kafka** | `9092` | – | Bus d'événements asynchrone |

Chaque service applicatif suit le pattern **Database-per-Service** afin de garantir un couplage faible et une autonomie de déploiement complète.

---

## 🔄 Flux de données

### 1️⃣ Création d'une commande — vue d'ensemble

```
Client → API Gateway → Order Service
                          │
                          ├── Vérification du client      → Customer Service (sync)
                          ├── Vérification du stock        → Product Service  (sync)
                          ├── Persistance de la commande    → PostgreSQL
                          ├── Persistance des lignes         → PostgreSQL
                          ├── Déclenchement du paiement      → Payment Service (sync)
                          └── Publication d'un événement     → Kafka (order-topic)
                                                                    │
                                                                    ▼
                                                        Notification Service
                                                                    │
                                                                    └── Envoi d'un email de confirmation
```

### 2️⃣ Synchrone vs Asynchrone

| Type de communication | Services concernés | Mécanisme |
| :--- | :--- | :--- |
| 🔵 **Synchrone (HTTP)** | Order → Customer, Product, Payment | OpenFeign / RestTemplate |
| 🟢 **Asynchrone (Event-Driven)** | Order/Payment → Notification | Kafka (`order-topic`, `payment-topic`) |

Ce découplage permet au **Notification Service** de rester totalement indépendant du cycle de vie de la commande : en cas d'indisponibilité, les messages restent dans Kafka jusqu'à traitement, garantissant la résilience du système.

---

## 🛠️ Stack technique

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- ☕ Java 21
- 🍃 Spring Boot 3.2.5
- ☁️ Spring Cloud (Config, Eureka, Gateway, OpenFeign)
- 🗃️ Spring Data JPA / Spring Data MongoDB
- 🔒 Spring Security + OAuth2 / JWT
- 📬 Spring Kafka
- ✉️ Spring Mail + Thymeleaf
- 🧬 Flyway (migrations SQL)
- ✨ Lombok

</td>
<td valign="top" width="50%">

**Infrastructure & Outils**
- 🐳 Docker / Docker Compose
- 🐘 PostgreSQL
- 🍃 MongoDB
- 📨 Apache Kafka + Zookeeper
- 🔐 Keycloak (IAM)
- 🕵️ Zipkin (distributed tracing)
- 📮 Postman (tests API)
- ✉️ MailDev (simulation SMTP)

</td>
</tr>
</table>

---

## 🖥️ Frontend (Next.js)

Le frontend consomme l'API exposée par la Gateway et gère l'authentification via **NextAuth** branché sur **Keycloak**, réutilisant le même flow OAuth2/JWT que le backend.

### Structure du projet

```
ecommerce-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (shop)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── admin/
│   │       ├── products/
│   │       │   └── page.tsx
│   │       ├── orders/
│   │       │   └── page.tsx
│   │       └── customers/
│   │           └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── providers.tsx
│   └── globals.css
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── dashboard/
│   │   ├── ProductTable.tsx
│   │   └── OrderTable.tsx
│   └── forms/
│       ├── LoginForm.tsx
│       └── CheckoutForm.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useProducts.ts
├── services/
│   ├── api-client.ts
│   ├── customer.service.ts
│   ├── product.service.ts
│   ├── order.service.ts
│   └── payment.service.ts
├── store/
│   └── cartStore.ts
├── types/
│   ├── customer.ts
│   ├── product.ts
│   ├── order.ts
│   └── api.ts
├── lib/
│   ├── utils.ts
│   └── validations.ts
├── config/
│   └── site.ts
├── public/
├── .env.local
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

### Choix techniques

| Besoin | Technologie | Justification |
| :--- | :--- | :--- |
| **Architecture** | Next.js 14 (App Router) | Server Components, SEO, routing basé sur le système de fichiers |
| **Typage** | TypeScript | Fiabilité du code, contrats partagés avec les DTOs backend |
| **UI** | shadcn/ui + Tailwind CSS | Composants accessibles et personnalisables sans surcharge runtime |
| **État global** | Zustand | Gestion légère du panier (`cartStore`), sans boilerplate Redux |
| **Données serveur** | TanStack Query | Cache, revalidation et synchronisation avec l'API Gateway |
| **Authentification** | NextAuth + Keycloak | Réutilisation du provider OAuth2/JWT déjà en place côté backend |
| **Animations** | Framer Motion | Transitions fluides sur le catalogue et le checkout |

Le découpage par **route groups** (`(auth)`, `(shop)`, `(dashboard)`) sépare clairement l'espace public, l'espace client et le back-office admin, chacun avec son propre layout et ses propres guards d'authentification.

---

## 📦 Prérequis

| Outil | Version minimale |
| :--- | :--- |
| Java (JDK) | 21+ |
| Node.js | 18+ |
| Maven | 3.8+ |
| Docker & Docker Compose | Dernière version stable |
| Postman | Pour les tests API |

---

## 🚀 Installation & lancement

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/e-commerce-microservices.git
cd e-commerce-microservices
```

### 2. Démarrer l'infrastructure

```bash
docker-compose up -d
```

Cette commande provisionne : **PostgreSQL**, **MongoDB**, **Kafka & Zookeeper**, **MailDev**, **Zipkin**, **Keycloak**.

### 3. Démarrer les microservices (backend)

> ⚠️ L'ordre ci-dessous respecte les dépendances de démarrage (config avant discovery, discovery avant les services métier).

```bash
mvn spring-boot:run -pl config-server
mvn spring-boot:run -pl discovery-server
mvn spring-boot:run -pl customer-service
mvn spring-boot:run -pl product-service
mvn spring-boot:run -pl order-service
mvn spring-boot:run -pl payment-service
mvn spring-boot:run -pl notification-service
mvn spring-boot:run -pl gateway-service
```

### 4. Démarrer le frontend

```bash
cd ecommerce-frontend
npm install
cp .env.example .env.local   # renseigner NEXTAUTH_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_API_URL, KEYCLOAK_*
npm run dev
```

Le frontend est accessible sur `http://localhost:3000` et consomme l'API via la Gateway (`http://localhost:8222`).

### 5. Configurer Keycloak

1. Accéder à la console d'administration : `http://localhost:9098`
2. Se connecter avec `admin` / `admin`
3. Créer un **Realm** : `micro-service`
4. Créer un **Client** : `microservices-api` avec *Client Authentication* activé (pour le backend)
5. Créer un second **Client** : `ecommerce-frontend` (type *public* ou *confidential* selon le flow NextAuth choisi)
6. Récupérer les **Client Secrets** depuis l'onglet *Credentials* de chaque client

---

## 🔐 Authentification

L'**API Gateway** protège l'ensemble des endpoints (à l'exception de `/eureka/**`) via un mécanisme OAuth2 / JWT centralisé sur Keycloak.

### 1. Obtenir un token JWT

| | |
| :--- | :--- |
| **URL** | `http://localhost:9098/realms/micro-service/protocol/openid-connect/token` |
| **Méthode** | `POST` |
| **Body** (`x-www-form-urlencoded`) | `client_id=microservices-api`<br>`client_secret=<votre-client-secret>`<br>`grant_type=client_credentials` |

### 2. Utiliser le token

```http
GET /api/v1/products
Authorization: Bearer <votre-token>
```

---

## 📋 Endpoints disponibles

| Méthode | Endpoint | Service | Description |
| :---: | :--- | :--- | :--- |
| `POST` | `/api/v1/customers` | Customer | Créer un client |
| `GET` | `/api/v1/customers/{id}` | Customer | Récupérer un client |
| `POST` | `/api/v1/products` | Product | Créer un produit |
| `GET` | `/api/v1/products` | Product | Lister les produits |
| `POST` | `/api/v1/orders` | Order | Créer une commande |
| `GET` | `/api/v1/orders` | Order | Lister les commandes |
| `GET` | `/api/v1/orders/{id}` | Order | Récupérer une commande |
| `GET` | `/api/v1/order-lines/order/{id}` | Order | Lignes d'une commande |
| `POST` | `/api/v1/payments` | Payment | Traiter un paiement |

---

## 📧 Emails (MailDev)

Les emails envoyés par le **Notification Service** sont interceptés localement — aucun envoi réel n'est effectué en développement.

🔗 Interface web : `http://localhost:1080`

---

## 🔍 Distributed Tracing (Zipkin)

Chaque requête traversant le système peut être tracée de bout en bout, service par service, pour diagnostiquer latences et erreurs.

🔗 Interface web : `http://localhost:9411`

---

## 🧪 Tests avec Postman

1. Importer la collection Postman fournie (si disponible dans `/postman`)
2. Configurer l'authentification **OAuth2** avec le `client_id` et `client_secret` de Keycloak
3. Tester les endpoints protégés via le token généré automatiquement

---

## 📁 Structure globale des dépôts

```
e-commerce-microservices/          # Backend — monorepo Maven
├── config-server/
├── discovery-server/
├── gateway-service/
├── customer-service/
├── product-service/
├── order-service/
├── payment-service/
├── notification-service/
├── docker-compose.yml
└── README.md

ecommerce-frontend/                # Frontend — Next.js 14 (voir structure détaillée ci-dessus)
├── app/
├── components/
├── hooks/
├── services/
├── store/
├── types/
└── package.json
```

---

## 🔧 Roadmap / Améliorations possibles

- [ ] Ajouter un **Circuit Breaker** (Resilience4j) pour la résilience inter-services
- [ ] Implémenter le **Saga Pattern** pour les transactions distribuées
- [ ] Centraliser les logs avec la stack **ELK** (Elasticsearch, Logstash, Kibana)
- [ ] Déployer sur **Kubernetes**
- [ ] Ajouter des tests unitaires et d'intégration (JUnit 5, Testcontainers)
- [ ] Gérer les rôles utilisateurs (`ADMIN`, `USER`) dans Keycloak
- [ ] Mettre en place un pipeline **CI/CD** (GitHub Actions)
- [ ] Ajouter des tests frontend (Vitest / Playwright) et le mode SSR pour les pages produits

---

## 👨‍💻 Auteur

**Yassine Bahadi**
Élève-ingénieur en Génie Logiciel & Systèmes Distribués — ENSET Mohammedia

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/votre-utilisateur)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/votre-profil)

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [`LICENSE`](LICENSE) pour plus de détails.

<div align="center">

⭐ **Si ce projet vous a été utile, n'hésitez pas à lui laisser une étoile !**

</div>