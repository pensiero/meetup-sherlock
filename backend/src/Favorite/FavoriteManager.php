<?php

namespace App\Favorite;

use App\Entity\Favorite;
use Doctrine\ORM\EntityManagerInterface;

class FavoriteManager
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * Add favorite
     *
     * @param string $meetupId
     *
     * @return Favorite
     */
    public function add($meetupId): Favorite
    {
        /** @var Favorite $favorite */
        $favorite = $this->em->getRepository('App:Favorite')->findOneBy(['meetupId' => $meetupId]);

        // favorite is already there
        if ($favorite !== null) {
            return $favorite;
        }

        // create a new favorite object
        $favorite = new Favorite();
        $favorite->setMeetupId($meetupId);

        $this->em->persist($favorite);
        $this->em->flush();

        return $favorite;
    }

    /**
     * Remove favorite
     *
     * @param string $meetupId
     */
    public function remove($meetupId): void
    {
        /** @var Favorite $favorite */
        $favorite = $this->em->getRepository('App:Favorite')->findOneBy(['meetupId' => $meetupId]);

        // favorite is already not there
        if ($favorite === null) {
            return;
        }

        // remove the favorite object
        $this->em->remove($favorite);
        $this->em->flush();
    }
}