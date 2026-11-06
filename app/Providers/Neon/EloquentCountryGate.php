<?php
namespace Coyote\Providers\Neon;

use Coyote\Country;
use Neon2\Invoice;
use Neon2\Invoice\CountryGate;

class EloquentCountryGate implements CountryGate {
    public function __construct() {}

    public function invoiceCountries(): array {
        return Country::query()
            ->orderBy('name')
            ->get()
            ->map(fn(Country $country) => new Invoice\Country(
                $country->code,
                $country->name,
            ))
            ->toArray();
    }
}
