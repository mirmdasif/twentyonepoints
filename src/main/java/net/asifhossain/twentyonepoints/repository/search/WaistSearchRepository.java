package net.asifhossain.twentyonepoints.repository.search;

import net.asifhossain.twentyonepoints.domain.Waist;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Waist entity.
 */
public interface WaistSearchRepository extends ElasticsearchRepository<Waist, Long> {
}
