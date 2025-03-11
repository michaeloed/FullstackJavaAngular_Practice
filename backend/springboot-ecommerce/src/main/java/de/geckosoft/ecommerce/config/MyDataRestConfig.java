package de.geckosoft.ecommerce.config;

import de.geckosoft.ecommerce.entities.Product;
import de.geckosoft.ecommerce.entities.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    private final Logger log = Logger.getLogger(this.getClass().getName());

    @Autowired
    public MyDataRestConfig(EntityManager _entEntityManager) {
        this.entityManager = _entEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
        HttpMethod[] unSupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

        log.log(Level.INFO, "Setting up RepositoryRestConfiguration. Not allowed methods: " + Arrays.toString(unSupportedActions));

        // disable HTTP methods for Product: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedActions));
        // disable HTTP methods for ProductCategory: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unSupportedActions));

        // expose the ids
        exposeIds(config);


        String allowedOrigins = "https://localhost:4200";
        log.log(Level.INFO, "Setting up CORS configuration. Allowed origins: " + allowedOrigins);
        // configure cors mapping
        corsRegistry.addMapping("/api/**").allowedOrigins(allowedOrigins);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();
        for (EntityType t: entities) {
            entityClasses.add(t.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}

