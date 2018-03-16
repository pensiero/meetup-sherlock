<?php

namespace App\Favorite;

use Doctrine\ORM\EntityManagerInterface;

class FavoriteProvider
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
     * List of all the favorites
     *
     * @return array
     */
    public function getAllFavorites(): array
    {
        return $this->em->getRepository('App:Favorite')->findAll();
    }
}