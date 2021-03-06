package net.asifhossain.twentyonepoints.repository.search;

import net.asifhossain.twentyonepoints.domain.Points;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Points entity.
 */
public interface PointsSearchRepository extends ElasticsearchRepository<Points, Long> {
}
