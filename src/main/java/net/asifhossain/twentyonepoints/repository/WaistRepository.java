package net.asifhossain.twentyonepoints.repository;

import net.asifhossain.twentyonepoints.domain.Waist;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Waist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WaistRepository extends JpaRepository<Waist, Long> {

    @Query("select waist from Waist waist where waist.user.login = ?#{principal.username}")
    List<Waist> findByUserIsCurrentUser();

}
