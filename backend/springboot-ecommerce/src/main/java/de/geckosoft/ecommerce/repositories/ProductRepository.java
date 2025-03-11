package de.geckosoft.ecommerce.repositories;

import de.geckosoft.ecommerce.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin("https://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> searchByNameContaining(@Param("name") String name, Pageable pageable);
}
