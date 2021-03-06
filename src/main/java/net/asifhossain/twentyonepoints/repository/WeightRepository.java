package net.asifhossain.twentyonepoints.repository;

import net.asifhossain.twentyonepoints.domain.Weight;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Weight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {

    @Query("select weight from Weight weight where weight.user.login = ?#{principal.username}")
    List<Weight> findByUserIsCurrentUser();

}
