package net.asifhossain.twentyonepoints.web.rest;

import net.asifhossain.twentyonepoints.TwentyonepointsApp;

import net.asifhossain.twentyonepoints.domain.Waist;
import net.asifhossain.twentyonepoints.domain.User;
import net.asifhossain.twentyonepoints.repository.WaistRepository;
import net.asifhossain.twentyonepoints.repository.search.WaistSearchRepository;
import net.asifhossain.twentyonepoints.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static net.asifhossain.twentyonepoints.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import net.asifhossain.twentyonepoints.domain.enumeration.LengthUnits;
/**
 * Test class for the WaistResource REST controller.
 *
 * @see WaistResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TwentyonepointsApp.class)
public class WaistResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_LENGTH = 1D;
    private static final Double UPDATED_LENGTH = 2D;

    private static final LengthUnits DEFAULT_UNIT = LengthUnits.INCH;
    private static final LengthUnits UPDATED_UNIT = LengthUnits.CM;

    @Autowired
    private WaistRepository waistRepository;


    /**
     * This repository is mocked in the net.asifhossain.twentyonepoints.repository.search test package.
     *
     * @see net.asifhossain.twentyonepoints.repository.search.WaistSearchRepositoryMockConfiguration
     */
    @Autowired
    private WaistSearchRepository mockWaistSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWaistMockMvc;

    private Waist waist;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WaistResource waistResource = new WaistResource(waistRepository, mockWaistSearchRepository);
        this.restWaistMockMvc = MockMvcBuilders.standaloneSetup(waistResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Waist createEntity(EntityManager em) {
        Waist waist = new Waist()
            .date(DEFAULT_DATE)
            .length(DEFAULT_LENGTH)
            .unit(DEFAULT_UNIT);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        waist.setUser(user);
        return waist;
    }

    @Before
    public void initTest() {
        waist = createEntity(em);
    }

    @Test
    @Transactional
    public void createWaist() throws Exception {
        int databaseSizeBeforeCreate = waistRepository.findAll().size();

        // Create the Waist
        restWaistMockMvc.perform(post("/api/waists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waist)))
            .andExpect(status().isCreated());

        // Validate the Waist in the database
        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeCreate + 1);
        Waist testWaist = waistList.get(waistList.size() - 1);
        assertThat(testWaist.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testWaist.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testWaist.getUnit()).isEqualTo(DEFAULT_UNIT);

        // Validate the Waist in Elasticsearch
        verify(mockWaistSearchRepository, times(1)).save(testWaist);
    }

    @Test
    @Transactional
    public void createWaistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = waistRepository.findAll().size();

        // Create the Waist with an existing ID
        waist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWaistMockMvc.perform(post("/api/waists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waist)))
            .andExpect(status().isBadRequest());

        // Validate the Waist in the database
        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeCreate);

        // Validate the Waist in Elasticsearch
        verify(mockWaistSearchRepository, times(0)).save(waist);
    }

    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = waistRepository.findAll().size();
        // set the field null
        waist.setUnit(null);

        // Create the Waist, which fails.

        restWaistMockMvc.perform(post("/api/waists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waist)))
            .andExpect(status().isBadRequest());

        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWaists() throws Exception {
        // Initialize the database
        waistRepository.saveAndFlush(waist);

        // Get all the waistList
        restWaistMockMvc.perform(get("/api/waists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waist.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT.toString())));
    }
    

    @Test
    @Transactional
    public void getWaist() throws Exception {
        // Initialize the database
        waistRepository.saveAndFlush(waist);

        // Get the waist
        restWaistMockMvc.perform(get("/api/waists/{id}", waist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(waist.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH.doubleValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWaist() throws Exception {
        // Get the waist
        restWaistMockMvc.perform(get("/api/waists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWaist() throws Exception {
        // Initialize the database
        waistRepository.saveAndFlush(waist);

        int databaseSizeBeforeUpdate = waistRepository.findAll().size();

        // Update the waist
        Waist updatedWaist = waistRepository.findById(waist.getId()).get();
        // Disconnect from session so that the updates on updatedWaist are not directly saved in db
        em.detach(updatedWaist);
        updatedWaist
            .date(UPDATED_DATE)
            .length(UPDATED_LENGTH)
            .unit(UPDATED_UNIT);

        restWaistMockMvc.perform(put("/api/waists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWaist)))
            .andExpect(status().isOk());

        // Validate the Waist in the database
        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeUpdate);
        Waist testWaist = waistList.get(waistList.size() - 1);
        assertThat(testWaist.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testWaist.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testWaist.getUnit()).isEqualTo(UPDATED_UNIT);

        // Validate the Waist in Elasticsearch
        verify(mockWaistSearchRepository, times(1)).save(testWaist);
    }

    @Test
    @Transactional
    public void updateNonExistingWaist() throws Exception {
        int databaseSizeBeforeUpdate = waistRepository.findAll().size();

        // Create the Waist

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWaistMockMvc.perform(put("/api/waists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(waist)))
            .andExpect(status().isBadRequest());

        // Validate the Waist in the database
        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Waist in Elasticsearch
        verify(mockWaistSearchRepository, times(0)).save(waist);
    }

    @Test
    @Transactional
    public void deleteWaist() throws Exception {
        // Initialize the database
        waistRepository.saveAndFlush(waist);

        int databaseSizeBeforeDelete = waistRepository.findAll().size();

        // Get the waist
        restWaistMockMvc.perform(delete("/api/waists/{id}", waist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Waist> waistList = waistRepository.findAll();
        assertThat(waistList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Waist in Elasticsearch
        verify(mockWaistSearchRepository, times(1)).deleteById(waist.getId());
    }

    @Test
    @Transactional
    public void searchWaist() throws Exception {
        // Initialize the database
        waistRepository.saveAndFlush(waist);
        when(mockWaistSearchRepository.search(queryStringQuery("id:" + waist.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(waist), PageRequest.of(0, 1), 1));
        // Search the waist
        restWaistMockMvc.perform(get("/api/_search/waists?query=id:" + waist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(waist.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Waist.class);
        Waist waist1 = new Waist();
        waist1.setId(1L);
        Waist waist2 = new Waist();
        waist2.setId(waist1.getId());
        assertThat(waist1).isEqualTo(waist2);
        waist2.setId(2L);
        assertThat(waist1).isNotEqualTo(waist2);
        waist1.setId(null);
        assertThat(waist1).isNotEqualTo(waist2);
    }
}
