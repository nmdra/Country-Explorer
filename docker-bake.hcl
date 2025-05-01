# docker-bake.hcl

# Define variables for customization
variable "REGISTRY" {
  default = "ghcr.io/nmdra"
}

variable "TAG" {
  default = "latest"
}

variable "VERSION" {}


variable "VITE_API_BASE_URL" {}
variable "VITE_COUNTRY_API_URL" {}

# Define common build configuration
target "common" {
  args = {
    BUILDKIT_INLINE_CACHE = "1"
  }
  labels = {
    "org.opencontainers.image.vendor" = "Country-Explorer"
    "org.opencontainers.image.created" = "${timestamp()}"
    "org.opencontainers.image.source" = "https://github.com/nmdra/Country-Explorer"
    "org.opencontainers.image.authors" = "Nimendra"
    "org.opencontainers.image.licenses" = "MIT"
  }
}

# Default group builds all services with their specified targets from docker-compose
group "default" {
  targets = ["frontend", "backend"]
}

# Frontend service
target "frontend" {
  inherits = ["common"]
  context = "./Frontend"
  tags = [
    "${REGISTRY}/country-explorer-frontend:${TAG}",
    "${REGISTRY}/country-explorer-frontend:${VERSION}"
  ]
  args = {
        VITE_COUNTRY_API_URL = "${VITE_COUNTRY_API_URL}"
        VITE_API_BASE_URL = "${VITE_API_BASE_URL}"
    }
}

# User Service (default to development as in docker-compose)
target "Backend" {
  inherits = ["common"]
  context = "./Backend"
  target = "production"
  tags = [
    "${REGISTRY}/country-explorer-backend:${TAG}",
    "${REGISTRY}/country-explorer-backend:${VERSION}"
 ]
}
