module arcadia::hero {
    use std::error;
    use std::option::{Self, Option};
    use std::string::{Self, String};
    use std::signer;
    use aptos_framework::object::{Self, Object, ConstructorRef};
    use aptos_token_objects::collection;
    use aptos_token_objects::token;

    /// The collection name for hero NFTs
    const COLLECTION_NAME: vector<u8> = b"Arcadia Heroes";
    /// The collection description for hero NFTs
    const COLLECTION_DESCRIPTION: vector<u8> = b"Heroes of the Arcadia Universe";
    /// The collection URI for hero NFTs
    const COLLECTION_URI: vector<u8> = b"https://arcadia.com/collection/heroes";

    const ENOT_ENOUGH_FUNDS: u64 = 1;
    const EHERO_DOES_NOT_EXIST: u64 = 2;
    const ENOT_OWNER: u64 = 3;
    const EHERO_NOT_STRONG_ENOUGH: u64 = 4;
    const EHERO_LOW_HEALTH: u64 = 5;

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Hero has key {
        name: String,
        description: String,
        uri: String,
        /// Game properties
        level: u64,
        health: u64,
        experience: u64,
        /// Equipment
        armor: Option<Object<Armor>>,
        weapon: Option<Object<Weapon>>,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Armor has key {
        defense: u64,
    }

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct Weapon has key {
        attack: u64,
    }

    fun init_module(creator: &signer) {
        // Create the collection for heroes
        collection::create_unlimited_collection(
            creator,
            string::utf8(COLLECTION_DESCRIPTION),
            string::utf8(COLLECTION_NAME),
            option::none(),
            string::utf8(COLLECTION_URI),
        );
    }

    /// Creates a new hero with basic stats
    public entry fun mint_hero(
        player: &signer,
        name: String,
        description: String,
        uri: String,
    ) {
        let constructor_ref = create_hero_internal(
            player,
            name,
            description,
            uri,
        );
        
        let token_signer = object::generate_signer(&constructor_ref);
        
        let hero = Hero {
            name,
            description,
            uri,
            level: 1,
            health: 100,
            experience: 0,
            armor: option::none(),
            weapon: option::none(),
        };

        move_to(&token_signer, hero);
    }

    /// Internal function to create a hero token
    fun create_hero_internal(
        player: &signer,
        name: String,
        description: String,
        uri: String,
    ): ConstructorRef {
        token::create_named_token(
            player,
            string::utf8(COLLECTION_NAME),
            description,
            name,
            option::none(),
            uri,
        )
    }

    /// Level up a hero if they have enough experience
    public entry fun level_up(player: &signer, hero: Object<Hero>) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(
            object::owns<Hero>(hero, signer::address_of(player)), 
            error::permission_denied(ENOT_OWNER)
        );
        assert!(
            hero_obj.experience >= hero_obj.level * 100, 
            error::invalid_argument(EHERO_NOT_STRONG_ENOUGH)
        );
        
        hero_obj.level = hero_obj.level + 1;
        hero_obj.health = hero_obj.health + 10;
        hero_obj.experience = 0;
    }

    /// Equip armor to a hero
    public entry fun equip_armor(
        player: &signer,
        hero: Object<Hero>,
        armor: Object<Armor>,
    ) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(
            object::owns<Hero>(hero, signer::address_of(player)), 
            error::permission_denied(ENOT_OWNER)
        );
        
        hero_obj.armor = option::some(armor);
    }

    /// Equip weapon to a hero
    public entry fun equip_weapon(
        player: &signer,
        hero: Object<Hero>,
        weapon: Object<Weapon>,
    ) acquires Hero {
        let hero_obj = borrow_global_mut<Hero>(object::object_address(&hero));
        assert!(exists<Hero>(object::object_address(&hero)), error::not_found(EHERO_DOES_NOT_EXIST));
        assert!(
            object::owns<Hero>(hero, signer::address_of(player)), 
            error::permission_denied(ENOT_OWNER)
        );
        
        hero_obj.weapon = option::some(weapon);
    }

    #[view]
    public fun get_level(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).level
    }

    #[view]
    public fun get_health(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).health
    }

    #[view]
    public fun get_experience(hero: Object<Hero>): u64 acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).experience
    }

    #[view]
    public fun get_armor(hero: Object<Hero>): Option<Object<Armor>> acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).armor
    }

    #[view]
    public fun get_weapon(hero: Object<Hero>): Option<Object<Weapon>> acquires Hero {
        borrow_global<Hero>(object::object_address(&hero)).weapon
    }
} 