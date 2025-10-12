"""
Supabase database utility for the Telegram bot.
"""
from typing import List, Optional
from supabase import create_client, Client
from src.config.settings import config
from src.models.fastapi.schema_public_latest import CurrenciesBaseSchema
from src.utils.logger import get_logger

logger = get_logger(__name__)


class SupabaseClient:
    """Supabase client for database operations."""
    
    def __init__(self):
        """Initialize Supabase client."""
        # Validate configuration before creating client
        if not config.supabase_url or not config.supabase_key:
            raise ValueError(f"Missing Supabase configuration: URL='{config.supabase_url}', Key={'present' if config.supabase_key else 'missing'}")
        
        try:
            self.client: Client = create_client(
                config.supabase_url,
                config.supabase_key
            )
        except Exception as e:
            logger.error(f"Failed to create Supabase client: {e}")
            raise
    
    async def get_currencies(self, limit: int = 10) -> List[CurrenciesBaseSchema]:
        """
        Fetch currencies from the database.
        
        Args:
            limit: Maximum number of currencies to fetch
            
        Returns:
            List of CurrenciesBaseSchema model instances
        """
        try:
            logger.info(f"Fetching {limit} currencies from database")
            
            # Select all fields needed for CurrenciesBaseSchema
            response = self.client.table('currencies') \
                .select('chain_id, id, name, ticker, decimals, is_public, icon, created_at, updated_at, type') \
                .limit(limit) \
                .execute()
            
            if response.data:
                logger.info(f"Successfully fetched {len(response.data)} currencies from Supabase")
                
                # Cast raw data to Pydantic models
                currencies = []
                for i, currency_data in enumerate(response.data, 1):
                    try:
                        # Create Pydantic model instance from raw data
                        currency_model = CurrenciesBaseSchema(**currency_data)
                        currencies.append(currency_model)
                        
                        # Print detailed info about each currency using model properties
                        logger.info(f"Currency {i}:")
                        logger.info(f"  - Chain ID: {currency_model.chain_id}")
                        logger.info(f"  - ID: {currency_model.id}")
                        logger.info(f"  - Name: {currency_model.name}")
                        logger.info(f"  - Ticker: {currency_model.ticker}")
                        logger.info(f"  - Decimals: {currency_model.decimals}")
                        logger.info(f"  - Is Public: {currency_model.is_public}")
                        logger.info(f"  - Icon: {currency_model.icon}")
                        logger.info(f"  - Type: {currency_model.field_type}")
                        logger.info(f"  - Created: {currency_model.created_at}")
                        
                    except Exception as model_error:
                        logger.error(f"Failed to create model for currency {i}: {model_error}")
                        logger.error(f"Raw data: {currency_data}")
                        continue
                
                logger.info(f"Successfully created {len(currencies)} currency models")
                return currencies
            else:
                logger.warning("No currencies found in database")
                return []
                
        except Exception as e:
            logger.error(f"Error fetching currencies: {e}")
            logger.error(f"Exception details: {str(e)}")
            return []
    



# Global Supabase client instance (will be initialized lazily)
_supabase_client = None

def get_supabase_client() -> SupabaseClient:
    """Get the singleton Supabase client instance."""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = SupabaseClient()
    return _supabase_client