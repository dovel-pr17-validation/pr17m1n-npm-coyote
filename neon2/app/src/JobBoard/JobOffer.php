<?php
namespace Neon2\JobBoard;

use Neon2\Request\JobOfferSubmit;

class JobOffer {
    public function __construct(
        public int            $id,
        public int            $expiresInDays,
        public ?string        $expiryDate,
        public JobOfferStatus $status,
        public JobOfferSubmit $fields,
        public ?PaymentIntent $payment,
        public string         $slug,
        public string         $applicationUrl,
        public bool           $canEdit,
        public bool           $isMine,
        public bool           $isNew,
        public bool           $isFavourite,
    ) {}
}
