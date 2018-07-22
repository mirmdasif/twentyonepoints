package net.asifhossain.twentyonepoints.repository;

import net.asifhossain.twentyonepoints.domain.Points;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Points entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointsRepository extends JpaRepository<Points, Long> {

    Page<Points> findAllByOrderByTimestampDesc(Pageable pageable);

    @Query(
        "select points from Points points " +
        "where points.user.login = ?#{principal.username} order by points.timestamp desc"
    )
    Page<Points> findByUserIsCurrentUser(Pageable pageable);
}
