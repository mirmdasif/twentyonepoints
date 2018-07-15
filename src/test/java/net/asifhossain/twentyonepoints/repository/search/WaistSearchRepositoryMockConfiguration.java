package net.asifhossain.twentyonepoints.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of WaistSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class WaistSearchRepositoryMockConfiguration {

    @MockBean
    private WaistSearchRepository mockWaistSearchRepository;

}
