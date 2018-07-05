package net.asifhossain.twentyonepoints.repository;

import net.asifhossain.twentyonepoints.domain.BloodPressure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the BloodPressure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {

    @Query("select blood_pressure from BloodPressure blood_pressure where blood_pressure.user.login = ?#{principal.username}")
    List<BloodPressure> findByUserIsCurrentUser();

}
