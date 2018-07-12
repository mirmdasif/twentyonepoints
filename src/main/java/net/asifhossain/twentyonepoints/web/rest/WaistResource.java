package net.asifhossain.twentyonepoints.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.asifhossain.twentyonepoints.domain.Waist;
import net.asifhossain.twentyonepoints.repository.WaistRepository;
import net.asifhossain.twentyonepoints.web.rest.errors.BadRequestAlertException;
import net.asifhossain.twentyonepoints.web.rest.util.HeaderUtil;
import net.asifhossain.twentyonepoints.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Waist.
 */
@RestController
@RequestMapping("/api")
public class WaistResource {

    private final Logger log = LoggerFactory.getLogger(WaistResource.class);

    private static final String ENTITY_NAME = "waist";

    private final WaistRepository waistRepository;

    public WaistResource(WaistRepository waistRepository) {
        this.waistRepository = waistRepository;
    }

    /**
     * POST  /waists : Create a new waist.
     *
     * @param waist the waist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new waist, or with status 400 (Bad Request) if the waist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/waists")
    @Timed
    public ResponseEntity<Waist> createWaist(@Valid @RequestBody Waist waist) throws URISyntaxException {
        log.debug("REST request to save Waist : {}", waist);
        if (waist.getId() != null) {
            throw new BadRequestAlertException("A new waist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Waist result = waistRepository.save(waist);
        return ResponseEntity.created(new URI("/api/waists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /waists : Updates an existing waist.
     *
     * @param waist the waist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated waist,
     * or with status 400 (Bad Request) if the waist is not valid,
     * or with status 500 (Internal Server Error) if the waist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/waists")
    @Timed
    public ResponseEntity<Waist> updateWaist(@Valid @RequestBody Waist waist) throws URISyntaxException {
        log.debug("REST request to update Waist : {}", waist);
        if (waist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Waist result = waistRepository.save(waist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, waist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /waists : get all the waists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of waists in body
     */
    @GetMapping("/waists")
    @Timed
    public ResponseEntity<List<Waist>> getAllWaists(Pageable pageable) {
        log.debug("REST request to get a page of Waists");
        Page<Waist> page = waistRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/waists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /waists/:id : get the "id" waist.
     *
     * @param id the id of the waist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the waist, or with status 404 (Not Found)
     */
    @GetMapping("/waists/{id}")
    @Timed
    public ResponseEntity<Waist> getWaist(@PathVariable Long id) {
        log.debug("REST request to get Waist : {}", id);
        Optional<Waist> waist = waistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(waist);
    }

    /**
     * DELETE  /waists/:id : delete the "id" waist.
     *
     * @param id the id of the waist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/waists/{id}")
    @Timed
    public ResponseEntity<Void> deleteWaist(@PathVariable Long id) {
        log.debug("REST request to delete Waist : {}", id);

        waistRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
