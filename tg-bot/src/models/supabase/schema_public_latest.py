from __future__ import annotations
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel
from pydantic import Field
from pydantic import UUID4
from pydantic.types import StringConstraints
from typing import Any
from typing import Any
from pydantic import Json
import datetime


# ENUM TYPES
# These are generated from Postgres user-defined enum types.

class PublicAccountsUsersRolesEnum(str, Enum):
	OWNER = "owner"
	ADMIN = "admin"
	MEMBER = "member"

class PublicContractTagEnumEnum(str, Enum):
	CLEAR = "clear"
	ALGO_ASA_AUCTION_APPROVAL = "algo_asa_auction_approval"
	ALGO_ASA_DUTCH_APPROVAL = "algo_asa_dutch_approval"
	ALGO_ASA_SALE_APPROVAL = "algo_asa_sale_approval"
	ALGO_OFFCHAIN_SALE_APPROVAL = "algo_offchain_sale_approval"
	ASA_ASA_AUCTION_APPROVAL = "asa_asa_auction_approval"
	ASA_ASA_DUTCH_APPROVAL = "asa_asa_dutch_approval"
	ASA_ASA_SALE_APPROVAL = "asa_asa_sale_approval"
	ASA_OFFCHAIN_SALE_APPROVAL = "asa_offchain_sale_approval"
	ARC200_ARC72_AUCTION_APPROVAL = "arc200_arc72_auction_approval"
	ARC200_ARC72_DUTCH_APPROVAL = "arc200_arc72_dutch_approval"
	ARC200_ARC72_SALE_APPROVAL = "arc200_arc72_sale_approval"
	ARC200_OFFCHAIN_SALE_APPROVAL = "arc200_offchain_sale_approval"
	VOI_ARC72_AUCTION_APPROVAL = "voi_arc72_auction_approval"
	VOI_ARC72_DUTCH_APPROVAL = "voi_arc72_dutch_approval"
	VOI_ARC72_SALE_APPROVAL = "voi_arc72_sale_approval"
	VOI_OFFCHAIN_SALE_APPROVAL = "voi_offchain_sale_approval"

class PublicListingsStatusesEnum(str, Enum):
	PENDING = "pending"
	ACTIVE = "active"
	CLOSED = "closed"
	CANCELLED = "cancelled"

class PublicAssetsTypesEnum(str, Enum):
	ARC72 = "arc72"
	OFFCHAIN = "offchain"
	ASA = "asa"



# CUSTOM CLASSES
# Note: These are custom model classes for defining common features among
# Pydantic Base Schema.


class CustomModel(BaseModel):
	"""Base model class with common features."""
	pass


class CustomModelInsert(CustomModel):
	"""Base model for insert operations with common features."""
	pass


class CustomModelUpdate(CustomModel):
	"""Base model for update operations with common features."""
	pass


# BASE CLASSES
# Note: These are the base Row models that include all fields.


class AccountsBaseSchema(CustomModel):
	"""Accounts Base Schema."""

	# Primary Keys
	id: UUID4

	# Columns
	authorize_requests: bool
	created_at: datetime.datetime
	name: str
	subscription_expiration_date: datetime.datetime | None = Field(default=None)
	subscription_id: int


class AccountsAddressesBaseSchema(CustomModel):
	"""AccountsAddresses Base Schema."""

	# Primary Keys
	account_id: UUID4
	address: str

	# Columns
	created_at: datetime.datetime
	name: str | None = Field(default=None)


class AccountsChainsParametersBaseSchema(CustomModel):
	"""AccountsChainsParameters Base Schema."""

	# Primary Keys
	account_id: UUID4
	chain_id: str

	# Columns
	created_at: datetime.datetime
	enable_secondary: bool
	secondary_fee_address: str | None = Field(default=None)
	secondary_percentage_fee: float


class AccountsCurrenciesBaseSchema(CustomModel):
	"""AccountsCurrencies Base Schema."""

	# Primary Keys
	account_id: UUID4
	chain_id: str
	currency: int

	# Columns
	created_at: datetime.datetime


class AccountsSecretsBaseSchema(CustomModel):
	"""AccountsSecrets Base Schema."""

	# Primary Keys
	account_id: UUID4
	secret: UUID4

	# Columns
	created_at: datetime.datetime
	name: str


class AccountsUsersAssociationBaseSchema(CustomModel):
	"""AccountsUsersAssociation Base Schema."""

	# Primary Keys
	account_id: UUID4
	user_email: str

	# Columns
	created_at: datetime.datetime
	role: PublicAccountsUsersRolesEnum


class AuctionsBaseSchema(CustomModel):
	"""Auctions Base Schema."""

	# Primary Keys
	listing_id: UUID4

	# Columns
	created_at: datetime.datetime
	duration: int
	increment: float
	start_price: float
	updated_at: datetime.datetime | None = Field(default=None)


class ChainsBaseSchema(CustomModel):
	"""Chains Base Schema."""

	# Primary Keys
	id: str

	# Columns
	created_at: datetime.datetime
	fee_proxy_app_id: int | None = Field(default=None)
	last_indexed_at: datetime.datetime | None = Field(default=None)


class ContractsBaseSchema(CustomModel):
	"""Contracts Base Schema."""

	# Primary Keys
	chain_id: str
	tag: PublicContractTagEnumEnum
	version: str

	# Columns
	byte_code: str
	created_at: datetime.datetime


class ContractsVersionsBaseSchema(CustomModel):
	"""ContractsVersions Base Schema."""

	# Primary Keys
	chain_id: str
	version: str

	# Columns
	created_at: datetime.datetime


class CurrenciesBaseSchema(CustomModel):
	"""Currencies Base Schema."""

	# Primary Keys
	chain_id: str
	id: int

	# Columns
	created_at: datetime.datetime
	decimals: int
	field_type: Any = Field(alias="type")
	icon: str | None = Field(default=None)
	is_public: bool
	name: str
	ticker: str
	updated_at: datetime.datetime | None = Field(default=None)


class DutchAuctionsBaseSchema(CustomModel):
	"""DutchAuctions Base Schema."""

	# Primary Keys
	listing_id: UUID4

	# Columns
	created_at: datetime.datetime
	duration: int
	max_price: float | None = Field(default=None)
	min_price: float
	updated_at: datetime.datetime | None = Field(default=None)


class ListingsBaseSchema(CustomModel):
	"""Listings Base Schema."""

	# Primary Keys
	id: UUID4

	# Columns
	account_id: UUID4
	app_id: int
	asset_id: int
	asset_qty: float
	asset_thumbnail: str | None = Field(default=None)
	asset_type: PublicAssetsTypesEnum
	chain_id: str
	contract_version: str
	created_at: datetime.datetime
	creator_address: str
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json
	name: str
	status: PublicListingsStatusesEnum
	updated_at: datetime.datetime | None = Field(default=None)


class SalesBaseSchema(CustomModel):
	"""Sales Base Schema."""

	# Primary Keys
	listing_id: UUID4

	# Columns
	created_at: datetime.datetime
	price: Decimal
	updated_at: datetime.datetime | None = Field(default=None)


class SubscriptionTiersBaseSchema(CustomModel):
	"""SubscriptionTiers Base Schema."""

	# Primary Keys
	id: int

	# Columns
	allow_custom_currencies: bool
	allow_secondary_listings: bool
	created_at: datetime.datetime
	duration: int | None = Field(default=None)
	name: str


class SubscriptionsChainsParametersBaseSchema(CustomModel):
	"""SubscriptionsChainsParameters Base Schema."""

	# Primary Keys
	chain_id: str
	subscription_id: int

	# Columns
	created_at: datetime.datetime
	flat_fees: float
	sales_fees: float
	secondary_flat_fees: float
	secondary_sales_fees: float


class TransactionsBaseSchema(CustomModel):
	"""Transactions Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json


class Transactions20250702BaseSchema(CustomModel):
	"""Transactions20250702 Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json


class Transactions20250704BaseSchema(CustomModel):
	"""Transactions20250704 Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json


class Transactions20250705BaseSchema(CustomModel):
	"""Transactions20250705 Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json


class Transactions20250709BaseSchema(CustomModel):
	"""Transactions20250709 Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json


class Transactions20250906BaseSchema(CustomModel):
	"""Transactions20250906 Base Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime
	from_address: str
	id: str

	# Columns
	amount: float | None = Field(default=None)
	currency: int
	field_type: Any = Field(alias="type")
	metadata: dict | list[dict] | list[Any] | Json
# INSERT CLASSES
# Note: These models are used for insert operations. Auto-generated fields
# (like IDs and timestamps) are optional.


class AccountsInsert(CustomModelInsert):
	"""Accounts Insert Schema."""

	# Primary Keys
	id: UUID4 | None = Field(default=None)  # has default value

	# Field properties:
	# authorize_requests: has default value
	# created_at: has default value
	# subscription_expiration_date: nullable
	# subscription_id: has default value
	
	# Required fields
	name: str
	
		# Optional fields
	authorize_requests: bool | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	subscription_expiration_date: datetime.datetime | None = Field(default=None)
	subscription_id: int | None = Field(default=None)


class AccountsAddressesInsert(CustomModelInsert):
	"""AccountsAddresses Insert Schema."""

	# Primary Keys
	account_id: UUID4
	address: str

	# Field properties:
	# created_at: has default value
	# name: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	name: str | None = Field(default=None)


class AccountsChainsParametersInsert(CustomModelInsert):
	"""AccountsChainsParameters Insert Schema."""

	# Primary Keys
	account_id: UUID4
	chain_id: str

	# Field properties:
	# created_at: has default value
	# enable_secondary: has default value
	# secondary_fee_address: nullable
	# secondary_percentage_fee: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	enable_secondary: bool | None = Field(default=None)
	secondary_fee_address: str | None = Field(default=None)
	secondary_percentage_fee: float | None = Field(default=None)


class AccountsCurrenciesInsert(CustomModelInsert):
	"""AccountsCurrencies Insert Schema."""

	# Primary Keys
	account_id: UUID4
	chain_id: str
	currency: int

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class AccountsSecretsInsert(CustomModelInsert):
	"""AccountsSecrets Insert Schema."""

	# Primary Keys
	account_id: UUID4
	secret: UUID4 | None = Field(default=None)  # has default value

	# Field properties:
	# created_at: has default value
	
	# Required fields
	name: str
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class AccountsUsersAssociationInsert(CustomModelInsert):
	"""AccountsUsersAssociation Insert Schema."""

	# Primary Keys
	account_id: UUID4
	user_email: str

	# Field properties:
	# created_at: has default value
	
	# Required fields
	role: PublicAccountsUsersRolesEnum
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class AuctionsInsert(CustomModelInsert):
	"""Auctions Insert Schema."""

	# Primary Keys
	listing_id: UUID4

	# Field properties:
	# created_at: has default value
	# updated_at: nullable
	
	# Required fields
	duration: int
	increment: float
	start_price: float
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class ChainsInsert(CustomModelInsert):
	"""Chains Insert Schema."""

	# Primary Keys
	id: str

	# Field properties:
	# created_at: has default value
	# fee_proxy_app_id: nullable
	# last_indexed_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	fee_proxy_app_id: int | None = Field(default=None)
	last_indexed_at: datetime.datetime | None = Field(default=None)


class ContractsInsert(CustomModelInsert):
	"""Contracts Insert Schema."""

	# Primary Keys
	chain_id: str
	tag: PublicContractTagEnumEnum
	version: str

	# Field properties:
	# created_at: has default value
	
	# Required fields
	byte_code: str
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class ContractsVersionsInsert(CustomModelInsert):
	"""ContractsVersions Insert Schema."""

	# Primary Keys
	chain_id: str
	version: str

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class CurrenciesInsert(CustomModelInsert):
	"""Currencies Insert Schema."""

	# Primary Keys
	chain_id: str
	id: int

	# Field properties:
	# created_at: has default value
	# icon: nullable
	# is_public: has default value
	# updated_at: nullable
	
	# Required fields
	decimals: int
	field_type: Any = Field(alias="type")
	name: str
	ticker: str
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	icon: str | None = Field(default=None)
	is_public: bool | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class DutchAuctionsInsert(CustomModelInsert):
	"""DutchAuctions Insert Schema."""

	# Primary Keys
	listing_id: UUID4

	# Field properties:
	# created_at: has default value
	# max_price: nullable
	# updated_at: nullable
	
	# Required fields
	duration: int
	min_price: float
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	max_price: float | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class ListingsInsert(CustomModelInsert):
	"""Listings Insert Schema."""

	# Primary Keys
	id: UUID4 | None = Field(default=None)  # has default value

	# Field properties:
	# asset_qty: has default value
	# asset_thumbnail: nullable
	# created_at: has default value
	# metadata: has default value
	# updated_at: nullable
	
	# Required fields
	account_id: UUID4
	app_id: int
	asset_id: int
	asset_type: PublicAssetsTypesEnum
	chain_id: str
	contract_version: str
	creator_address: str
	currency: int
	field_type: Any = Field(alias="type")
	name: str
	status: PublicListingsStatusesEnum
	
		# Optional fields
	asset_qty: float | None = Field(default=None)
	asset_thumbnail: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class SalesInsert(CustomModelInsert):
	"""Sales Insert Schema."""

	# Primary Keys
	listing_id: UUID4

	# Field properties:
	# created_at: has default value
	# updated_at: nullable
	
	# Required fields
	price: Decimal
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class SubscriptionTiersInsert(CustomModelInsert):
	"""SubscriptionTiers Insert Schema."""

	# Primary Keys
	

	# Field properties:
	# allow_custom_currencies: has default value
	# allow_secondary_listings: has default value
	# created_at: has default value
	# duration: nullable
	
	# Required fields
	name: str
	
		# Optional fields
	allow_custom_currencies: bool | None = Field(default=None)
	allow_secondary_listings: bool | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	duration: int | None = Field(default=None)


class SubscriptionsChainsParametersInsert(CustomModelInsert):
	"""SubscriptionsChainsParameters Insert Schema."""

	# Primary Keys
	chain_id: str
	subscription_id: int

	# Field properties:
	# created_at: has default value
	# flat_fees: has default value
	# sales_fees: has default value
	# secondary_flat_fees: has default value
	# secondary_sales_fees: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	flat_fees: float | None = Field(default=None)
	sales_fees: float | None = Field(default=None)
	secondary_flat_fees: float | None = Field(default=None)
	secondary_sales_fees: float | None = Field(default=None)


class TransactionsInsert(CustomModelInsert):
	"""Transactions Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250702Insert(CustomModelInsert):
	"""Transactions20250702 Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250704Insert(CustomModelInsert):
	"""Transactions20250704 Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250705Insert(CustomModelInsert):
	"""Transactions20250705 Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250709Insert(CustomModelInsert):
	"""Transactions20250709 Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250906Insert(CustomModelInsert):
	"""Transactions20250906 Insert Schema."""

	# Primary Keys
	app_id: int
	chain_id: str
	created_at: datetime.datetime | None = Field(default=None)  # has default value
	from_address: str
	id: str

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
	# Required fields
	currency: int
	field_type: Any = Field(alias="type")
	
		# Optional fields
	amount: float | None = Field(default=None)
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)
# UPDATE CLASSES
# Note: These models are used for update operations. All fields are optional.


class AccountsUpdate(CustomModelUpdate):
	"""Accounts Update Schema."""

	# Primary Keys
	id: UUID4 | None = Field(default=None)

	# Field properties:
	# authorize_requests: has default value
	# created_at: has default value
	# subscription_expiration_date: nullable
	# subscription_id: has default value
	
		# Optional fields
	authorize_requests: bool | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	name: str | None = Field(default=None)
	subscription_expiration_date: datetime.datetime | None = Field(default=None)
	subscription_id: int | None = Field(default=None)


class AccountsAddressesUpdate(CustomModelUpdate):
	"""AccountsAddresses Update Schema."""

	# Primary Keys
	account_id: UUID4 | None = Field(default=None)
	address: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# name: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	name: str | None = Field(default=None)


class AccountsChainsParametersUpdate(CustomModelUpdate):
	"""AccountsChainsParameters Update Schema."""

	# Primary Keys
	account_id: UUID4 | None = Field(default=None)
	chain_id: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# enable_secondary: has default value
	# secondary_fee_address: nullable
	# secondary_percentage_fee: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	enable_secondary: bool | None = Field(default=None)
	secondary_fee_address: str | None = Field(default=None)
	secondary_percentage_fee: float | None = Field(default=None)


class AccountsCurrenciesUpdate(CustomModelUpdate):
	"""AccountsCurrencies Update Schema."""

	# Primary Keys
	account_id: UUID4 | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	currency: int | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class AccountsSecretsUpdate(CustomModelUpdate):
	"""AccountsSecrets Update Schema."""

	# Primary Keys
	account_id: UUID4 | None = Field(default=None)
	secret: UUID4 | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	name: str | None = Field(default=None)


class AccountsUsersAssociationUpdate(CustomModelUpdate):
	"""AccountsUsersAssociation Update Schema."""

	# Primary Keys
	account_id: UUID4 | None = Field(default=None)
	user_email: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	role: PublicAccountsUsersRolesEnum | None = Field(default=None)


class AuctionsUpdate(CustomModelUpdate):
	"""Auctions Update Schema."""

	# Primary Keys
	listing_id: UUID4 | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# updated_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	duration: int | None = Field(default=None)
	increment: float | None = Field(default=None)
	start_price: float | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class ChainsUpdate(CustomModelUpdate):
	"""Chains Update Schema."""

	# Primary Keys
	id: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# fee_proxy_app_id: nullable
	# last_indexed_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	fee_proxy_app_id: int | None = Field(default=None)
	last_indexed_at: datetime.datetime | None = Field(default=None)


class ContractsUpdate(CustomModelUpdate):
	"""Contracts Update Schema."""

	# Primary Keys
	chain_id: str | None = Field(default=None)
	tag: PublicContractTagEnumEnum | None = Field(default=None)
	version: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	byte_code: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)


class ContractsVersionsUpdate(CustomModelUpdate):
	"""ContractsVersions Update Schema."""

	# Primary Keys
	chain_id: str | None = Field(default=None)
	version: str | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)


class CurrenciesUpdate(CustomModelUpdate):
	"""Currencies Update Schema."""

	# Primary Keys
	chain_id: str | None = Field(default=None)
	id: int | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# icon: nullable
	# is_public: has default value
	# updated_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	decimals: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	icon: str | None = Field(default=None)
	is_public: bool | None = Field(default=None)
	name: str | None = Field(default=None)
	ticker: str | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class DutchAuctionsUpdate(CustomModelUpdate):
	"""DutchAuctions Update Schema."""

	# Primary Keys
	listing_id: UUID4 | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# max_price: nullable
	# updated_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	duration: int | None = Field(default=None)
	max_price: float | None = Field(default=None)
	min_price: float | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class ListingsUpdate(CustomModelUpdate):
	"""Listings Update Schema."""

	# Primary Keys
	id: UUID4 | None = Field(default=None)

	# Field properties:
	# asset_qty: has default value
	# asset_thumbnail: nullable
	# created_at: has default value
	# metadata: has default value
	# updated_at: nullable
	
		# Optional fields
	account_id: UUID4 | None = Field(default=None)
	app_id: int | None = Field(default=None)
	asset_id: int | None = Field(default=None)
	asset_qty: float | None = Field(default=None)
	asset_thumbnail: str | None = Field(default=None)
	asset_type: PublicAssetsTypesEnum | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	contract_version: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	creator_address: str | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)
	name: str | None = Field(default=None)
	status: PublicListingsStatusesEnum | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class SalesUpdate(CustomModelUpdate):
	"""Sales Update Schema."""

	# Primary Keys
	listing_id: UUID4 | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# updated_at: nullable
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	price: Decimal | None = Field(default=None)
	updated_at: datetime.datetime | None = Field(default=None)


class SubscriptionTiersUpdate(CustomModelUpdate):
	"""SubscriptionTiers Update Schema."""

	# Primary Keys
	

	# Field properties:
	# allow_custom_currencies: has default value
	# allow_secondary_listings: has default value
	# created_at: has default value
	# duration: nullable
	
		# Optional fields
	allow_custom_currencies: bool | None = Field(default=None)
	allow_secondary_listings: bool | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	duration: int | None = Field(default=None)
	name: str | None = Field(default=None)


class SubscriptionsChainsParametersUpdate(CustomModelUpdate):
	"""SubscriptionsChainsParameters Update Schema."""

	# Primary Keys
	chain_id: str | None = Field(default=None)
	subscription_id: int | None = Field(default=None)

	# Field properties:
	# created_at: has default value
	# flat_fees: has default value
	# sales_fees: has default value
	# secondary_flat_fees: has default value
	# secondary_sales_fees: has default value
	
		# Optional fields
	created_at: datetime.datetime | None = Field(default=None)
	flat_fees: float | None = Field(default=None)
	sales_fees: float | None = Field(default=None)
	secondary_flat_fees: float | None = Field(default=None)
	secondary_sales_fees: float | None = Field(default=None)


class TransactionsUpdate(CustomModelUpdate):
	"""Transactions Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250702Update(CustomModelUpdate):
	"""Transactions20250702 Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250704Update(CustomModelUpdate):
	"""Transactions20250704 Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250705Update(CustomModelUpdate):
	"""Transactions20250705 Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250709Update(CustomModelUpdate):
	"""Transactions20250709 Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


class Transactions20250906Update(CustomModelUpdate):
	"""Transactions20250906 Update Schema."""

	# Primary Keys
	app_id: int | None = Field(default=None)
	chain_id: str | None = Field(default=None)
	created_at: datetime.datetime | None = Field(default=None)
	from_address: str | None = Field(default=None)
	id: str | None = Field(default=None)

	# Field properties:
	# amount: nullable
	# metadata: has default value
	
		# Optional fields
	amount: float | None = Field(default=None)
	currency: int | None = Field(default=None)
	field_type: Any | None = Field(default=None, alias="type")
	metadata: dict | list[dict] | list[Any] | Json | None = Field(default=None)


# OPERATIONAL CLASSES


class Accounts(AccountsBaseSchema):
	"""Accounts Schema for Pydantic.

	Inherits from AccountsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	subscription_tiers: SubscriptionTiers | None = Field(default=None)
	accounts_addresses: list[AccountsAddresses] | None = Field(default=None)
	accounts_chains_parameters: list[AccountsChainsParameters] | None = Field(default=None)
	accounts_currencies: list[AccountsCurrencies] | None = Field(default=None)
	accounts_secrets: list[AccountsSecrets] | None = Field(default=None)
	accounts_users_associations: list[AccountsUsersAssociation] | None = Field(default=None)
	listings: list[Listings] | None = Field(default=None)


class AccountsAddresses(AccountsAddressesBaseSchema):
	"""AccountsAddresses Schema for Pydantic.

	Inherits from AccountsAddressesBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)


class AccountsChainsParameters(AccountsChainsParametersBaseSchema):
	"""AccountsChainsParameters Schema for Pydantic.

	Inherits from AccountsChainsParametersBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)
	chains: Chains | None = Field(default=None)


class AccountsCurrencies(AccountsCurrenciesBaseSchema):
	"""AccountsCurrencies Schema for Pydantic.

	Inherits from AccountsCurrenciesBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class AccountsSecrets(AccountsSecretsBaseSchema):
	"""AccountsSecrets Schema for Pydantic.

	Inherits from AccountsSecretsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)


class AccountsUsersAssociation(AccountsUsersAssociationBaseSchema):
	"""AccountsUsersAssociation Schema for Pydantic.

	Inherits from AccountsUsersAssociationBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)


class Auctions(AuctionsBaseSchema):
	"""Auctions Schema for Pydantic.

	Inherits from AuctionsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	listings: Listings | None = Field(default=None)


class Chains(ChainsBaseSchema):
	"""Chains Schema for Pydantic.

	Inherits from ChainsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts_chains_parameters: list[AccountsChainsParameters] | None = Field(default=None)
	contracts_versions: list[ContractsVersions] | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)
	listings: list[Listings] | None = Field(default=None)
	subscriptions_chains_parameters: list[SubscriptionsChainsParameters] | None = Field(default=None)
	transactions: list[Transactions] | None = Field(default=None)
	transactions_2025_09_06s: list[Transactions20250906] | None = Field(default=None)
	transactions_2025_07_09s: list[Transactions20250709] | None = Field(default=None)
	transactions_2025_07_05s: list[Transactions20250705] | None = Field(default=None)
	transactions_2025_07_04s: list[Transactions20250704] | None = Field(default=None)
	transactions_2025_07_02s: list[Transactions20250702] | None = Field(default=None)


class Contracts(ContractsBaseSchema):
	"""Contracts Schema for Pydantic.

	Inherits from ContractsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	contracts_versions: list[ContractsVersions] | None = Field(default=None)


class ContractsVersions(ContractsVersionsBaseSchema):
	"""ContractsVersions Schema for Pydantic.

	Inherits from ContractsVersionsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	contracts: list[Contracts] | None = Field(default=None)
	listings: list[Listings] | None = Field(default=None)


class Currencies(CurrenciesBaseSchema):
	"""Currencies Schema for Pydantic.

	Inherits from CurrenciesBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	accounts_currencies: list[AccountsCurrencies] | None = Field(default=None)
	listings: list[Listings] | None = Field(default=None)
	transactions: list[Transactions] | None = Field(default=None)
	transactions_2025_09_06s: list[Transactions20250906] | None = Field(default=None)
	transactions_2025_07_09s: list[Transactions20250709] | None = Field(default=None)
	transactions_2025_07_05s: list[Transactions20250705] | None = Field(default=None)
	transactions_2025_07_04s: list[Transactions20250704] | None = Field(default=None)
	transactions_2025_07_02s: list[Transactions20250702] | None = Field(default=None)


class DutchAuctions(DutchAuctionsBaseSchema):
	"""DutchAuctions Schema for Pydantic.

	Inherits from DutchAuctionsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	listings: Listings | None = Field(default=None)


class Listings(ListingsBaseSchema):
	"""Listings Schema for Pydantic.

	Inherits from ListingsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: Accounts | None = Field(default=None)
	chains: Chains | None = Field(default=None)
	contracts_versions: list[ContractsVersions] | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)
	auctions: Auctions | None = Field(default=None)
	dutch_auctions: DutchAuctions | None = Field(default=None)
	sales: Sales | None = Field(default=None)


class Sales(SalesBaseSchema):
	"""Sales Schema for Pydantic.

	Inherits from SalesBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	listings: Listings | None = Field(default=None)


class SubscriptionTiers(SubscriptionTiersBaseSchema):
	"""SubscriptionTiers Schema for Pydantic.

	Inherits from SubscriptionTiersBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	accounts: list[Accounts] | None = Field(default=None)
	subscriptions_chains_parameters: list[SubscriptionsChainsParameters] | None = Field(default=None)


class SubscriptionsChainsParameters(SubscriptionsChainsParametersBaseSchema):
	"""SubscriptionsChainsParameters Schema for Pydantic.

	Inherits from SubscriptionsChainsParametersBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	subscription_tiers: SubscriptionTiers | None = Field(default=None)


class Transactions(TransactionsBaseSchema):
	"""Transactions Schema for Pydantic.

	Inherits from TransactionsBaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class Transactions20250702(Transactions20250702BaseSchema):
	"""Transactions20250702 Schema for Pydantic.

	Inherits from Transactions20250702BaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class Transactions20250704(Transactions20250704BaseSchema):
	"""Transactions20250704 Schema for Pydantic.

	Inherits from Transactions20250704BaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class Transactions20250705(Transactions20250705BaseSchema):
	"""Transactions20250705 Schema for Pydantic.

	Inherits from Transactions20250705BaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class Transactions20250709(Transactions20250709BaseSchema):
	"""Transactions20250709 Schema for Pydantic.

	Inherits from Transactions20250709BaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)


class Transactions20250906(Transactions20250906BaseSchema):
	"""Transactions20250906 Schema for Pydantic.

	Inherits from Transactions20250906BaseSchema. Add any customization here.
	"""

	# Foreign Keys
	chains: Chains | None = Field(default=None)
	currencies: list[Currencies] | None = Field(default=None)
